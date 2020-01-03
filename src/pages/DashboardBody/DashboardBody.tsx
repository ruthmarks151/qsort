import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import Box from "@material-ui/core/Box";
import React from "react";
import {NavbarContext, useStyles} from "./NavbarContainer";

export function DashboardBody(props: {}) {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    React.useContext(NavbarContext).setTitle("Dashboard");

    return <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper className={fixedHeightPaper}>
                        <Chart/>
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        <Deposits/>
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Orders/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>;
}