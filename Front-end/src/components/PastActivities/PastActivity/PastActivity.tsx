/* eslint-disable */
import { TableRow, TableCell } from '@material-ui/core'
import { StockI } from '../../../interfaces/Stock';

interface Props {
  activity: StockI;
}

export const PastActivity = ({ activity }: Props) => {
  return (
    <TableRow>
      <TableCell component="th" scope="activity">
        {activity.date}
      </TableCell>
      <TableCell align="right">{activity.company}</TableCell>
      <TableCell align="right">{activity.ticker}</TableCell>
      <TableCell align="right">{activity.action}</TableCell>
      <TableCell align="right">{activity.quantity}</TableCell>
      <TableCell align="right">${activity.price}</TableCell>
      <TableCell align="right">${activity.netAmount}</TableCell>
    </TableRow>

  )
};