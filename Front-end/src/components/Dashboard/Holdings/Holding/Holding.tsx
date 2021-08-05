import {TableRow, TableCell} from '@material-ui/core';

interface Props {
  
}

export const Holding = ({ holding, portfolioValue }: any) => {
  // create interface for these after all the files are tsx
  console.log(holding);
// holding format
//   avgCost: 146.81
// company: "Apple Inc"
// price: 147.05499
// quantity: 10
// ticker: "AAPL"
  console.log(portfolioValue);

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




