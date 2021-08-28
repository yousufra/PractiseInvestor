import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import Holding from './Holding/holding';
import Box from '@material-ui/core/Box';
import { getCurrentPrice } from '../../../api/stockApi';
import PieChart from './PieChart/PieChart';

const Holdings = () => {
  const classes = useStyles();
  const [totalHoldingsValue, setTotalHoldingsValue] = useState(0);
  const [holdingsPrices, setHoldingsPrices] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);

  const { holdings, cash } = useSelector((state) => state.holdings);

  useEffect(() => {
    function getPrice () {
      const apiCallArray = holdings.map(async (holding) => {
        const price = Number((await getCurrentPrice(holding.ticker)).data.price)
        return {...holding, price };
      });
      Promise.all(apiCallArray).then((res)=>{
        setHoldingsPrices(res);
        let calcPortfolioValue = cash;
        res.forEach((holding)=>{
          calcPortfolioValue += holding.price*holding.quantity;
        });
        setPortfolioValue(Number(calcPortfolioValue.toFixed(2)));
      });

    };

    getPrice();
    const interval = setInterval(() => getPrice(), 15000 );

    return () => {
      clearInterval(interval);
    }
  }, [holdings])

  return (
    <>
      <Box m={1}>
        <PieChart portfolioValue={portfolioValue} cash={cash} holdingsValue={portfolioValue-cash} b="2rem"/>
      </Box>
      {!holdings.length ? <p>No Holdings, buy a stock</p> : (
        <Box m={1}>
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
                {holdingsPrices.map((holding) => (
                  <Holding key={holding.company} holding={holding} portfolioValue={portfolioValue}/>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Box>
        )
      }
  </>
  );
};

export default Holdings;
