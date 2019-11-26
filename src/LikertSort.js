import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const labels = ["Strongly Does Not Describe",
                "Does Not Describe",
                "Somewhat Does Not Describe",
                "Neutrally Describes",
                "Somewhat Describes",
                "Describes",
                "Strongly Describes"];

function assignToLikert(sortedStatements, statement, index){
  return Array.from(sortedStatements, (list, i) => {
    return (i === index) ? [...list, statement] : list;
  })
}

function statements(items){
  return <h4>{items.length}</h4>
  // return( <ul>
  //   {items.map((text) => <li>{text}</li>)}
  // </ul>)
}

function createTable(assignStatementToLikert){
  let table = []
  return (<div>
        <Grid item>
          <ButtonGroup
            style={{ margin: "12px" }}
            variant="contained"
            color="primary"
            aria-label="full-width contained primary button group"
          >
            {labels.map((label, i) => (<Button
                                          style={{ width: String((100.0/labels.length)+"%") }}
                                          onClick={(e) => assignStatementToLikert(i)}>
                                          {label}
                                        </Button>))}

          </ButtonGroup>
        </Grid>


          </div>)
}

function LikertSort(props){
  const defaultCurrentStatement = () => 0
  const [currentStatement, setCurrentStatement] = useState(defaultCurrentStatement());
  const defaultSortedStatements = () => labels.map((_) => [])
  const [sortedStatements, setSortedStatements] = useState(defaultSortedStatements());

  return (<div style={{width: "100%"}}>
            <p>{props.items[currentStatement]}</p>
            {createTable(clickedLikert => {
              setSortedStatements(assignToLikert(sortedStatements,props.items[currentStatement],clickedLikert));
              setCurrentStatement(currentStatement + 1);
            })}
            <Button variant="contained"
                    color="secondary"
                    onClick={(e) => {
                      setCurrentStatement(defaultCurrentStatement());
                      setSortedStatements(defaultSortedStatements());
                    }}>
              Clear
            </Button>
          </div>)
}

  export default LikertSort
