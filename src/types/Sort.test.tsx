import React from 'react';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Indicies, Sort} from "./Sort";
import {Map} from "immutable";
import {StatementString} from "./SortType";

configure({ adapter: new Adapter() });


it('crashes when given invalid construction object', () => {
    expect(() => (new Sort({}))).toThrowError(RegExp(".*not defined in Sort constructor"));
});

it('constructs with a valid constructor', () => {
   new Sort({
       id: "an id",
       note: "a note",
       result: Map<Indicies, StatementString[]>([
               [0, [""]] as [Indicies, StatementString[]],
               [1, [""]] as [Indicies, StatementString[]],
               [2, [""]] as [Indicies, StatementString[]],
               [3, [""]] as [Indicies, StatementString[]],
               [4, [""]] as [Indicies, StatementString[]],
               [5, [""]] as [Indicies, StatementString[]],
               [6, [""]] as [Indicies, StatementString[]],
               [7, [""]] as [Indicies, StatementString[]],
               [8, [""]]as [Indicies, StatementString[]]
           ]),
       sortTypeId:"type id",
       sortClass: "class",
       sortedBy: "somebody",
       sortedOn: " a time"
   })
});