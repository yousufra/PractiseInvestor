/* eslint-disable */
import { TableRow, TableCell } from '@material-ui/core'
import { StockI } from '../../../interfaces/Stock';

interface Props {
  activity: StockI;
}

export const PastActivity = ({ activity }: Props) => {
  return (
    <TableRow>
      <TableCell component="th" scope="activity" data-testid="activity-date">
        {activity.date}
      </TableCell>
      <TableCell align="right" data-testid="activity-company">{activity.company}</TableCell>
      <TableCell align="right" data-testid="activity-ticker">{activity.ticker}</TableCell>
      <TableCell align="right" data-testid="activity-action">{activity.action}</TableCell>
      <TableCell align="right" data-testid="activity-quantity">{activity.quantity}</TableCell>
      <TableCell align="right" data-testid="activity-price">${activity.price.toFixed(2)}</TableCell>
      <TableCell align="right" data-testid="activity-netAmount">${activity.netAmount.toFixed(2)}</TableCell>
    </TableRow>
  )
};