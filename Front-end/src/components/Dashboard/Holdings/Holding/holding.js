/* eslint-disable */
import React, {useState, useEffect} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { getCurrentPrice } from '../../../../api/stockApi';

const Holding = ({ holding }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    async function getPrice () {
      // setPrice(Number((await getCurrentPrice(holding.ticker)).data.price));
    }
    getPrice();
    // const interval = setInterval(() => getPrice(), 1800000 ); // every 30 mins

    // return () => {
    //   clearInterval(interval);
    // }
  }, []);

  return (
    <TableRow key={holding.company}>
      <TableCell component="th" scope="holding">
        {holding.company}
      </TableCell>
      <TableCell align="right">{holding.ticker}</TableCell>
      <TableCell align="right">{holding.quantity}</TableCell>
      <TableCell align="right">${price.toFixed(2)}</TableCell>
      <TableCell align="right">${holding.avgCost}</TableCell>
      <TableCell align="right">{price-holding.avgCost < 0? '-':null}${((Math.abs(price-holding.avgCost)*holding.quantity)).toFixed(2)} ({(((price-holding.avgCost)/holding.avgCost)*100).toFixed(2)}%)</TableCell>
      <TableCell align="right">(portfolioValue-price*quantity)/totalValue</TableCell>
    </TableRow>
  )
};

export default Holding;


