import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./CongruenceChart";
import Congruences from "./Congruences";
import SortTable from "./SortTable";
import Box from "@material-ui/core/Box";
import React from "react";
import {NavbarContext, useStyles} from "./NavbarContainer";
import {allSortsForUser, listenForSortsByQSet, qSort} from "../../types/QSort";

export function DashboardBody(props: {}) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [sorts, setSorts] = React.useState<qSort[]>([]);

    React.useEffect(() => {
        return allSortsForUser(setSorts)
    }, []);

    React.useContext(NavbarContext).setTitle("Dashboard");

    return <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                {/* CongruenceChart */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper className={fixedHeightPaper}>
                        <Chart sorts={sorts}/>
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        <Congruences sorts={sorts}/>
                    </Paper>
                </Grid>
                {/* Recent SortTable */}
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <SortTable sorts={sorts}/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>;
}