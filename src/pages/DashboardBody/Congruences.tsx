import React from 'react';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import {qSort} from "../../types/QSort";
import {ReactComponent} from "*.svg";
import {databaseRef} from "../../firebase";
import {correlation} from "../Analysis/Analysis";

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function Congruences({sorts}: { sorts: qSort[] }) {
    const classes = useStyles();
    console.log(sorts);
    const qSets = Array.from(new Set(sorts.map(s => s.qSet.id)));

    return (
        <React.Fragment>
            <Title>Most Recent Congruences</Title>
            {   qSets.map(setId => {
                const setSorts = sorts.filter(s => s.qSet.id === setId);
                const self = setSorts.filter((s) => s.qSubjectId === "self").slice(-1)[0];
                const ideal = setSorts.filter((s) => s.qSubjectId === "ideal").slice(-1)[0];
                const set = self.qSet;
                const mostRecent =( self && (!ideal || self.sortedOn.toDate().getTime() > ideal.sortedOn.toDate().getTime()) ? self : ideal);
                if (!(self && ideal)) return <React.Fragment/>;

                return <React.Fragment>
                    <Typography component="p" variant={"h6"}>{set.name}:</Typography>
                    <Typography component="p" variant="h4">
                        {correlation(self, ideal).toFixed(3)}
                    </Typography>
                    <Typography color="textSecondary" className={classes.depositContext}>
                        As of {mostRecent.sortedOn.toDate().toISOString().substr(0, 10)}
                    </Typography>
                </React.Fragment>
            })}
            <div>
                <Link color="primary" href="/dosort">
                    Do a Sort
                </Link>
            </div>
        </React.Fragment>
    );
}
