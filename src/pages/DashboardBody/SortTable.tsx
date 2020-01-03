import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import {allSortsForUser, listenForSortsByQSet, qSort} from "../../types/QSort";

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function SortTable({sorts}: {sorts: qSort[]}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Q Set</TableCell>
            <TableCell></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorts.map(sort => (
            <TableRow key={sort.id}>
              <TableCell>{sort.sortedOn.toDate().toISOString().substr(0, 10)}</TableCell>
              <TableCell>{sort.sortClass}</TableCell>
              <TableCell>{sort.qSet.name}</TableCell>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#">
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
