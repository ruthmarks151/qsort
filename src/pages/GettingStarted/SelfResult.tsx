import BigInfoPage from "./BigInfoPage";
import {Container, Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell} from "@material-ui/core";
import {SortSelectionContext} from "../../components/SortSelectionContext";
import {DoSort} from "../DoSort/DoSort";
import Loading from "../../components/Loading";
import React, {useState} from "react";
import {useStyles} from "../../components/NavbarContainer";
import {getSort, qSort} from "../../types/QSort";
import {StatementString} from "../../types/QSet";
import {labels} from "../DoSort/LikertSort"


export default function SelfResult() {
    const classes = useStyles();
    const [sort, setSort] = useState<qSort | null>();
    getSort("XTNyaNK4fPHapqLuOwg8", setSort);
    let rows: StatementString[][] = [];
    if (sort){
        rows=sort.asArrays()
    }
    return <React.Fragment>
        <BigInfoPage
            title="You're done, lets take a look at how you see yourself"
            body={[]}
        />
        <Container maxWidth="lg">
            <TableContainer component={Paper}>
                <Table aria-label="simple table">

                    <TableBody>
                        {rows.slice().reverse().map((row, i) => (
                            <TableRow key={i}>
                                <TableCell component="th" scope="row">
                                    <b>{labels.slice().reverse()[i]}</b>
                                </TableCell>
                                {row.map(s =>
                                    <TableCell align="right">{sort?.qSet.statements[s].statement}</TableCell>)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
        <BigInfoPage
            title="How does this compare to your ideal concept of yourself?"
            body={[
                "If you do the same sorting task about your ideal self, there's a lot you can learn",
                "How much does your ideal self align with your current self concept?",
                "In which ways do your perceived and ideal selves differ?"
            ]}
            primaryText="Yeah! Self knowledge is sweet!"
            primaryLink="/ideal"
            secondaryText="Naw, I only like to do things halfway"
            secondaryLink="https://i.redd.it/13puf3zoqtm01.jpg"
        />
    </React.Fragment>
}