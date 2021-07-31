/* eslint-disable react/prop-types */
import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const Holding = ({ holding }) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <TableRow key={holding.company}>
    <TableCell component="th" scope="holding">
      {holding.company}
    </TableCell>
    <TableCell align="right">{holding.ticker}</TableCell>
    <TableCell align="right">{holding.quantity}</TableCell>
    <TableCell align="right">{holding.avgCost}</TableCell>
  </TableRow>
);

export default Holding;
