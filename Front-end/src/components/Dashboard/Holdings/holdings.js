import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux'; // to retrieve the data from the store in redux
import useStyles from './styles';
import Holding from './Holding/holding';

const Holdings = () => {
  const classes = useStyles();
  // eslint-disable-next-line max-len
  const holdings = useSelector((state) => state.holdings); // state object is all the states within the combine reducer in index.js in reducer folder

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    !holdings.length ? <p>No Holdings, buy a stock</p> : (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell align="right">Ticker</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Current Price</TableCell>
              <TableCell align="right">Avg Cost</TableCell>
              <TableCell align="right">Unrealized Gain/Loss</TableCell>
              <TableCell align="right">% of Portfolio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holdings.map((holding) => (
              <Holding key={holding.company} holding={holding} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
};

export default Holdings;
