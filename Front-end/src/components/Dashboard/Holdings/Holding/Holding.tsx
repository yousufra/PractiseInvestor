import {TableRow, TableCell} from '@material-ui/core';
import { HoldingI } from '../../../../interfaces/Holding';

interface Props {
  holding: HoldingI
  portfolioValue: number
}

export const Holding = ({ holding, portfolioValue }: Props) => {
  return (
    <TableRow key={holding.company}>
      <TableCell component="th" scope="holding">
        {holding.company}
      </TableCell>
      <TableCell align="right">{holding.ticker}</TableCell>
      <TableCell align="right">{holding.quantity}</TableCell>
      <TableCell align="right">${holding.price.toFixed(2)}</TableCell>
      <TableCell align="right">${holding.avgCost}</TableCell>
      <TableCell align="right"style={holding.price-holding.avgCost < 0?{color: 'red'}:{color: 'green'}}>{holding.price-holding.avgCost < 0? '-':null}${((Math.abs(holding.price-holding.avgCost)*holding.quantity)).toFixed(2)} ({(((holding.price-holding.avgCost)/holding.avgCost)*100).toFixed(2)}%)</TableCell>
      <TableCell align="right">{Number(((holding.price*holding.quantity/portfolioValue)*100).toFixed(2))}%</TableCell>
    </TableRow>
  )
}




