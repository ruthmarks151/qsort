import React from 'react';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {PileId, qSort} from "./QSort";
import {Map} from "immutable";
import {StatementString} from "./QSet";

configure({ adapter: new Adapter() });


it('crashes when given invalid construction object', () => {
    expect(() => (new qSort({}))).toThrowError(RegExp(".*not defined in Sort constructor"));
});

it('constructs with a valid constructor', () => {
   new qSort({
       id: "an id",
       note: "a note",
       result: Map<PileId, StatementString[]>([
               [0, [""]] as [PileId, StatementString[]],
               [1, [""]] as [PileId, StatementString[]],
               [2, [""]] as [PileId, StatementString[]],
               [3, [""]] as [PileId, StatementString[]],
               [4, [""]] as [PileId, StatementString[]],
               [5, [""]] as [PileId, StatementString[]],
               [6, [""]] as [PileId, StatementString[]],
               [7, [""]] as [PileId, StatementString[]],
               [8, [""]]as [PileId, StatementString[]]
           ]),
       sortTypeId:"type id",
       sortClass: "class",
       sortedBy: "somebody",
       sortedOn: " a time"
   })
});