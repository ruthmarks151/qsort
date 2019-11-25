import React from 'react';
import ReactDOM from 'react-dom';

import Enzyme from 'enzyme';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import BucketTransposition from './BucketTransposition';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BucketTransposition />, div);
  ReactDOM.unmountComponentAtNode(div);
});


const pickN = (list, toPick) => {
  // Dummy implimentation that gives the first items
  return new Promise((resolve, _) => resolve(list.slice(0, toPick)));
}

it("Sorts from a single bucket", () =>{
  const wrapper = shallow(<BucketTransposition  />);
  const sorted = wrapper.instance().bucketMerge([1,2,1],[["a", "b", "c", "d"]], pickN);
  sorted.then(result => expect( [
                                  [["a"],["b", "c"], ["d"]],
                                  [["a"],["c", "b"], ["d"]]
                                ] ).toContainEqual(result),
              err => console.error(err));
});

it("Sorts from a singleton buckets", () =>{
  const wrapper = shallow(<BucketTransposition  />);
  const sorted = wrapper.instance().bucketMerge([1,2,1],[["a"], [], ["b"], [], ["c"], ["d"]], pickN);
  sorted.then(result => expect( [
                                  [["a"],["b", "c"], ["d"]],
                                  [["a"],["c", "b"], ["d"]]
                                ] ).toContainEqual(result),
              err => console.error(err));
});
