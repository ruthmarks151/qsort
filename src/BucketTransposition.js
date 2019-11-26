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


function extremes(list, qualifier){
  const leftIndex = list.findIndex(qualifier)
  const rightIndex = list.length - ( list.slice().reverse().findIndex(qualifier) + 1 )
  return [leftIndex, rightIndex]
}

function bucketMerge(goalDistribution, source, pickN){
  return new Promise(function(resolve, reject){
    if(source.every((bucket) => bucket.length === 0)
       || goalDistribution.every((goal) => goal === 0)){
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
      pickedResult.then(function(picked){
        const afterGoal = Array.from(goalDistribution, (goal, i) => {
          return (i === goalIndex) ? goal - picked.length : goal;
        })
        const afterSource = Array.from(source, (items, i) => {
          return (i === sourceIndex) ? items.filter(item => !picked.includes(item)) : items;
        })

        if(goalDistribution.reduce((a, b) => a + b, 0) === afterGoal.reduce((a, b) => a + b, 0)){
          reject(new Error("Invalid step, no progress made"))
        }
        const solvedSubproblem = bucketMerge(afterGoal, afterSource, pickN)

        solvedSubproblem.then(result => {
          resolve(Array.from(result, (list, i) => {
            return (i === goalIndex) ? [...list, ...picked] : list;
          }))
          }, err => reject(err));
        }.bind(this),
        err => reject(err));
      }
  }.bind(this));
}

function renderPickables(items, pick){
    return items.map((item, index) => (
        <FormControlLabel
          control={<Checkbox
                      checked={item.picked}
                      onChange={() => { pick(index) }}
                      value={index} />}
          label={item.label}
        />) )

    return (<ul>
              {items.map((item, index) => (<div>
                                      <ToggleButton
                                        value="check"
                                        variant="outlined"
                                        color="primary"
                                        selected={item.picked}>
                                        {item.label}
                                      </ToggleButton>

                                    </div>))}
            </ul>)
}

function BucketTransposition(props){

  const defaultStatements = () => props.statements.map((s) => ({label: s, picked: false, key: s}));
  const [statements, setStatements] = useState(defaultStatements());

  return (<div>
            <h1></h1>

            <FormControl required
            // error={error}
            component="fieldset"
            //className={classes.formControl}
            >
              <FormLabel component="legend">Pick The {props.n} Most Descriptive Statements</FormLabel>
                <FormGroup>
                  {renderPickables(statements, (clickedItem) => {
                    statements[clickedItem].picked = !statements[clickedItem].picked
                    setStatements([...statements])
                  })}
                </FormGroup>
              <FormHelperText>{"Select "+props.n+" and only "+props.n}</FormHelperText>
            </FormControl>

            <br/>
            <Button variant="contained"
                    color="primary"
                    disabled={(props.n !== statements.filter((x) => x.picked).length)}>
              Save
            </Button>
          </div>)
}


export default BucketTransposition;
export {bucketMerge} ;
