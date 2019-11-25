import React from 'react';

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
    return( <ul>
      {items.map((text) => <li>{text}</li>)}
    </ul>)
  }

  createTable(){
    let table = []
    return (<div>
            <button onClick={(e) => this.clear()}>Clear</button>
            <table style={{width: "100%", table_layout: "fixed" }}>
                <tbody>
                  <tr>
                    {labels.map((label, i) => (<td style={{width: (String(100/labels.length)+"%")}}
                                                   onClick={(e) => this.assignTo(i)}>
                                                  <h6>{label}</h6>
                                                  <h5>{i + 1}</h5>
                                                  {this.statements(this.state["sorted"][i])}
                                                </td>))}
                  </tr>
                </tbody>
              </table>
            </div>)
  }

  render(props){
    return (<div style={{width: "100%"}}><p>{this.props.items[this.state['currentStatement']]}</p>
    {this.createTable()}
    </div>)
  }
}
