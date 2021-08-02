/* eslint-disable */
import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const PastActivity = ({ activity }) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <TableRow>
    <TableCell component="th" scope="activity">
      {activity.date}
    </TableCell>
    <TableCell align="right">{activity.company}</TableCell>
    <TableCell align="right">{activity.ticker}</TableCell>
    <TableCell align="right">{activity.action}</TableCell>
    <TableCell align="right">{activity.quantity}</TableCell>
    <TableCell align="right">{activity.price}</TableCell>
    <TableCell align="right">{activity.netAmount}</TableCell>
  </TableRow>
);

export default PastActivity;

