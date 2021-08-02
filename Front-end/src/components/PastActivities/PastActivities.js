/* eslint-disable */
import React, {useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import PastActivity from './PastActivity/PastActivity';
import { getAllActivities } from '../../actions/activity';

const PastActivities = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  const activities = useSelector((state) => state.activities);

  return (
    !activities.length ? <p>No Acitvities, buy a stock</p> : (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Company</TableCell>
              <TableCell align="right">Ticker</TableCell>
              <TableCell align="right">Action</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Net Amount</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity, index) => (
              <PastActivity key={index} activity={activity} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
};

export default PastActivities;
