import React, {useState} from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {QSet, StatementString} from "../../types/QSet";

const labels: string[] = [
    "Strongly Does Not Describe",
    "Does Not Describe",
    "Somewhat Does Not Describe",
    "Neutrally Describes",
    "Somewhat Describes",
    "Describes",
    "Strongly Describes"
];

function assignToLikert(sortedStatements: StatementString[][], statement: StatementString, index: number): StatementString[][] {
    return Array.from(sortedStatements, (list, i) => {
        return (i === index) ? [...list, statement] : list;
    })
}

function statements(items: string[]): JSX.Element {
    return <h4>{items.length}</h4>
    // return( <ul>
    //   {items.map((text) => <li>{text}</li>)}
    // </ul>)
}

function createTable(assignStatementToLikert: (_: number) => void): JSX.Element {
    let table = []
    return (<div>
        <Grid item>
            <ButtonGroup
                style={{margin: "12px"}}
                variant="contained"
                color="primary"
                aria-label="full-width contained primary button group"
            >
                {labels.map((label, i) => (<Button
                    style={{width: String((100.0 / labels.length) + "%")}}
                    onClick={(e) => assignStatementToLikert(i)}>
                    {label}
                </Button>))}

            </ButtonGroup>
        </Grid>


    </div>)
}

export interface LikertSortProps {
    onComplete(_:StatementString[][]):  void;
    sortType: QSet;
}

function LikertSort(props: LikertSortProps): JSX.Element {
    const defaultCurrentStatement: () => number = () => 0;
    const [currentStatement, setCurrentStatement] = useState<number>(defaultCurrentStatement());
    const defaultSortedStatements: () => StatementString[][] = () => labels.map((_:string) => []);
    const [sortedStatements, setSortedStatements] = useState<StatementString[][]>(defaultSortedStatements());

    const items = Object.values(props.sortType.statements).map(s => s.statement);

    return (<div style={{width: "100%"}}>
        <h3>Step 1: Select to what degree the following statement applies to the subject of the sort</h3>
        <p>{items[currentStatement]}</p>
        {createTable(clickedLikert => {
            const updatedSortedStatements = assignToLikert(sortedStatements, items[currentStatement], clickedLikert)
            if ((currentStatement + 1) >= items.length) {
                props.onComplete(updatedSortedStatements)
            } else {
                setSortedStatements(updatedSortedStatements);
                setCurrentStatement(currentStatement + 1);
            }
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
