import React from 'react';

export default class BucketTransposition extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  extremes(list, qualifier){
    const leftIndex = list.findIndex(qualifier)
    const rightIndex = list.length - ( list.slice().reverse().findIndex(qualifier) + 1 )
    return [leftIndex, rightIndex]
  }

  bucketMerge(goalDistribution, source, pickN){
    return new Promise(function(resolve, reject){
      if(source.every((bucket) => bucket.length == 0)
         || goalDistribution.every((goal) => goal == 0)){
        // With no goal or source remaining, return the empty sink pattern
        resolve(Array.from(goalDistribution, (_) => []));
      }else {
        const [leftGoal, rightGoal] = this.extremes(goalDistribution, (x => x != 0));
        const [leftSource, rightSource] = this.extremes(source, ((x) => x.length != 0));
        const leftOverflow = source[leftSource].length - goalDistribution[leftGoal];
        const rightOverflow = source[rightSource].length - goalDistribution[rightGoal];
        const pickRightmost = rightOverflow < leftOverflow && (source[rightSource].length > 0 && goalDistribution[rightGoal] > 0);
        const goalIndex = pickRightmost ? rightGoal : leftGoal;
        const sourceIndex = pickRightmost ? rightSource:  leftSource;
        const toPick = Math.min(goalDistribution[goalIndex], source[sourceIndex].length)

        const pickedResult = pickN(source[sourceIndex], toPick);
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
          const solvedSubproblem = this.bucketMerge(afterGoal, afterSource, pickN)

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

  render(props){
    return (<div >  </div>)
  }
}
