// import React from 'react'
// import Holding from './Holding/Holding';
// import {useSelector} from 'react-redux'; //to retrieve the data from the store in redux


// const Holdings = () => {
//   const holdings = useSelector(state => state.holdings);

//   return (
//     <>
//     {holdings.map( holding => (
//       <Holding holding={holding}></Holding>
//     ))

//     }
//     </>
//   )
// }

// export default Holdings

import React from 'react';
import useStyles from './styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useSelector} from 'react-redux'; //to retrieve the data from the store in redux


const Holdings = () => {
  const classes = useStyles();
  const holdings = useSelector(state => state.holdings);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell align="right">Ticker</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Avg Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {holdings.map((holding) => (
            <TableRow key={holding.company}>
              <TableCell component="th" scope="holding">
                {holding.company}
              </TableCell>
              <TableCell align="right">{holding.ticker}</TableCell>
              <TableCell align="right">{holding.quantity}</TableCell>
              <TableCell align="right">{holding.avgCost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Holdings