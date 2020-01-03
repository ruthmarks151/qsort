import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //margin: 'auto',
    },
    paper: {
      //width: '40vw',
      // height: 600,
      //overflow: 'auto',
    },
    button: {
      margin: theme.spacing(0.5, 0),
    },
  }),
);

function not<T>(a: T[], b: T[]) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection<T>(a: T[], b: T[]) {
  return a.filter(value => b.indexOf(value) !== -1);
}

export interface BucketAnnealerProps { sort: string[][]; onComplete: ((_:string[][]) => void); }

export default function BucketAnnealer(props: BucketAnnealerProps) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState<string[]>([]);
  const [sort, setSort]  = React.useState<string[][]>(props.sort)
  const [index, setIndex] = React.useState<number>(0)

  const leftChecked = intersection<string>(checked, sort[index]);
  const rightChecked = intersection<string>(checked, sort[index + 1]);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  function done(){
    if((index + 2) >= sort.length){
      console.log(sort);
      props.onComplete(sort)
    }else{
      setIndex(index + 1);
      setChecked([]);
    }
  }

  const swap = () => {
    const newLeft = not(sort[index], leftChecked).concat(rightChecked);
    const newRight = not(sort[index + 1], rightChecked).concat(leftChecked);
    const newSort = [...sort.slice(0,index),newLeft,newRight,...sort.slice(index + 2)];

    setSort(newSort);
    setChecked([]);
  };

  const customList = (items: string[]) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value: string) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
              selected={checked.indexOf(value) !== -1}
              button>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

    return (<div>
        <h3>Step 3: Check your work and swap statements such that the statements on the right all better describe the
            subject of the sort better than the statements on the left</h3>
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
            <Grid item style={{flexGrow: 1, flexBasis: 264, margin: "auto"}}>{customList(sort[index])}</Grid>
            <Grid item style={{flexGrow: 0, margin: "auto"}}>
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={swap}
                        disabled={leftChecked.length !== rightChecked.length || rightChecked.length == 0}
                        aria-label="swap selected items"
                    >
                        <SwapHorizIcon/>
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={(e) => done()}
                        aria-label="save selections"
                    >
                        <DoneIcon/>
                    </Button>

                </Grid>
            </Grid>
            <Grid item style={{flexGrow: 1, flexBasis: 264, margin: "auto"}}>{customList(sort[index + 1])}</Grid>
        </Grid>
    </div>);
}
