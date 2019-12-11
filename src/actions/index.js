import {databaseRef} from '../firebase';
import {FETCH_SORTS} from './types';

export const addSort = newSort => async dispatch => {
  databaseRef.push().set(newSort);
};

// export const completeToDo = completeToDoId => async dispatch => {
//   todosRef.child(completeToDoId).remove();
// };

export const fetchSorts = () => async dispatch => {

  // databaseRef.collection("sorts").get()
  //     .then(function(querySnapshot) {
  //       querySnapshot.forEach(function(doc) {
  //         // doc.data() is never undefined for query doc snapshots
  //         console.log(doc.id, " => ", doc.data());
  //       });
  //       dispatch({
  //         type: FETCH_SORTS,
  //         payload: {}
  //       });
  //     });

};
