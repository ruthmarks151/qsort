import React, { useState }  from 'react';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import {SortType, StatementString} from "./types/SortType";


function extremes<T>(list: T[], qualifier: (_:T) => boolean): [number, number]{
  const leftIndex = list.findIndex(qualifier);
  const rightIndex = list.length - ( list.slice().reverse().findIndex(qualifier) + 1 );
  return [leftIndex, rightIndex];
}

type pickNFunction = (list: StatementString[], toPick:number ,pickRightmost:boolean) => Promise<StatementString[]>

function bucketMerge(goalDistribution: number[], source: StatementString[][], pickN: pickNFunction): Promise<StatementString[][]>{
  return new Promise(function(resolve: (_:StatementString[][]) => void, reject: (_:any) => void){
    if(source.every((bucket) => bucket.length === 0) || goalDistribution.every((goal) => goal === 0)){
      // With no goal or source remaining, return the empty sink pattern
      resolve(Array.from(goalDistribution, (_) => []));
    }else {
      const [leftGoal, rightGoal] = extremes(goalDistribution, (x => x !== 0));
      const [leftSource, rightSource] = extremes(source, ((x) => x.length !== 0));
      const leftOverflow = source[leftSource].length - goalDistribution[leftGoal];
      const rightOverflow = source[rightSource].length - goalDistribution[rightGoal];
      const pickRightmost = rightOverflow < leftOverflow && (source[rightSource].length > 0 && goalDistribution[rightGoal] > 0);
      const goalIndex = pickRightmost ? rightGoal : leftGoal;
      const sourceIndex = pickRightmost ? rightSource:  leftSource;
      const toPick = Math.min(goalDistribution[goalIndex], source[sourceIndex].length)

      const pickedResult = pickN(source[sourceIndex], toPick, pickRightmost);
      pickedResult.then(function(picked: StatementString[]){
        const afterGoal = Array.from(goalDistribution, (goal, i) => {
          return (i === goalIndex) ? goal - picked.length : goal;
        });
        const afterSource = Array.from(source, (items, i) => {
          return (i === sourceIndex) ? items.filter(item => !picked.includes(item)) : items;
        });

        if(goalDistribution.reduce((a, b) => a + b, 0) === afterGoal.reduce((a, b) => a + b, 0)){
          reject(new Error("Invalid step, no progress made"))
        }
        const solvedSubproblem = bucketMerge(afterGoal, afterSource, pickN)

        solvedSubproblem.then(result => {
          resolve(Array.from(result, (list, i) => {
            return (i === goalIndex) ? [...list, ...picked] : list;
          }))
          }, err => reject(err));
        },
        err => reject(err));
      }
  });
}

interface PickableItem {
    label: string;
    picked: boolean;
    key: string
}

function renderPickables(items: PickableItem[], pick: (_:number) => void): JSX.Element[]{
    return items.map((item, index) => (
        <FormControlLabel
          control={<Checkbox
                      checked={item.picked}
                      onChange={() => { pick(index) }}
                      value={index} />}
          label={item.label}
        />) )
}

export interface BucketTranspositionProps {
    sortType: SortType;
    source: StatementString[][];
    onComplete: (_:StatementString[][]) => void;
}

function BucketTransposition(props: BucketTranspositionProps){

  const defaultStatements: (_:string[]) => PickableItem[] = (s: string[]) => s.map((s: string) => ({label: s, picked: false, key: s} as PickableItem));
  const [statements, setStatements] = useState<PickableItem[] | null>(null);
  const [n, setN] = useState<number | null>(null);
  const [pickMost, setPickMost] = useState<boolean | null>(null);
  const [onSave, setOnSave] = useState<(_:StatementString[]) => void>((x) => {});

  const [result, setResult] = useState(null);

  if(n == null
    && statements == null
    && pickMost == null
    && props.sortType != null
    && props.source != null){
    bucketMerge(props.sortType.distribution,
                props.source,
                (list, toPick, pickRightmost) => {
                  if (toPick === list.length){
                    return new Promise((resolve, _) => resolve(list))
                  } else {
                    setStatements(defaultStatements(list));
                    if (list.length < (2 * toPick)){
                      setN(list.length - toPick);
                      setPickMost(!pickRightmost);
                      return new Promise((resolve, _) =>
                      setOnSave(() => (
                       (picked: StatementString[]) => { resolve(list.filter(value => picked.indexOf(value) === -1));}
                     )));
                    } else {
                      setN(toPick);
                      setPickMost(pickRightmost);
                      return new Promise((resolve, _) =>
                      setOnSave(() => (
                       (picked: StatementString[]) => { resolve(picked) }
                      ))
                    )
                  }
              }
              }).then((res) => {props.onComplete(res)});
                return <h1>Loading</h1>
  }else if (n == null || statements == null || pickMost == null) {
     return <h1>Loading</h1>
  }

  return (<div>
            <h1></h1>

            <FormControl required
            // error={error}
            component="fieldset"
            //className={classes.formControl}
            >
              <FormLabel component="legend">Pick The {n} {pickMost ? "Most" : "Least"} Descriptive Statements</FormLabel>
                <FormGroup>
                  {renderPickables(statements, (clickedItem) => {
                    statements[clickedItem].picked = !statements[clickedItem].picked
                    setStatements([...statements])
                  })}
                </FormGroup>
              <FormHelperText>{"Select "+n+" and only "+n}</FormHelperText>
            </FormControl>

            <br/>
            <Button variant="contained"
                    color="primary"
                    disabled={(n !== statements.filter((x) => x.picked).length)}
                    onClick={(e) => {
                      const clicked = statements.filter((s) => s.picked).map((s) => s.label);
                      onSave(clicked)
                    }}>
              Save
            </Button>
          </div>)
}


export default BucketTransposition;
export {bucketMerge} ;
