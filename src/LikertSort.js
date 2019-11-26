import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const labels = ["Strongly Does Not Describe",
                "Does Not Describe",
                "Somewhat Does Not Describe",
                "Neutrally Describes",
                "Somewhat Describes",
                "Describes",
                "Strongly Describes"]

export default class LikertSort extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentStatement: 0,
                  sorted: labels.map((_) => [])}
  }

  clear(){
    this.setState({currentStatement: 0,
                  sorted: labels.map((_) => [])});
  }

  assignTo(index){
    this.setState(function(state, props){
      const newState = {
        currentStatement: state.currentStatement + 1,
        sorted: Array.from(state.sorted, (list, i) => {
          return (i === index) ? [...list, props.items[state.currentStatement]] : list;
        })
      };
      console.log(newState);
      return newState;
  });
  }

  statements(items){
    return <h4>{items.length}</h4>
    // return( <ul>
    //   {items.map((text) => <li>{text}</li>)}
    // </ul>)
  }

  createTable(){
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
                                            onClick={(e) => this.assignTo(i)}>
                                            {label}
                                          </Button>))}

            </ButtonGroup>
          </Grid>


            </div>)
  }

  render(props){
    return (<div style={{width: "100%"}}>
              <p>{this.props.items[this.state['currentStatement']]}</p>
              {this.createTable()}
              <Button variant="contained"
                      color="secondary"
                      onClick={(e) => this.clear()}>
                Clear
              </Button>
            </div>)
  }
}
