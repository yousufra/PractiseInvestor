import { useState, useEffect } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper} from '@material-ui/core';
import { useSelector } from 'react-redux'; // to retrieve the data from the store in redux
import useStyles from './styles';
import { Holding } from './StockChart/Holding/Holding';
import Box from '@material-ui/core/Box';
import { getCurrentPrice } from '../../../api/stockApi';
import { PieChart } from './PieChart/PieChart';
import { HoldingI, NoPriceHoldingI } from '../../../interfaces/Holding';
import { StockChart } from './StockChart/StockChart'

interface Props {
  toggleComponent: (str: string) => void; 
}

export const Holdings = ({toggleComponent}: Props) => {
  
  const classes = useStyles();
  const [holdingsPrices, setHoldingsPrices] = useState<HoldingI[]>([]);
  const [portfolioValue, setPortfolioValue] = useState<number>(0);

  const { holdings, cash } = useSelector((state: any) => state.holdings); // state object is all the states within the combine reducer in index.js in reducer folder
  
  useEffect(() => {
    function getPrice () {
      const apiCallArray = holdings?.map(async (holding: NoPriceHoldingI) => {
        const price = Number((await getCurrentPrice(holding.ticker)).data.price)
        return {...holding, price };
      });      
      apiCallArray && Promise.all<HoldingI>(apiCallArray).then((res: HoldingI[]) => {
        setHoldingsPrices(res);
        let calcPortfolioValue = cash;
        res && res.forEach((holding: HoldingI)=>{
          calcPortfolioValue += holding.price*holding.quantity;
        });
        setPortfolioValue(Number(calcPortfolioValue.toFixed(2)));
      });

    };

    getPrice();
    const interval = setInterval(() => getPrice(), 120000 ); // every 1 minute, 55 api calls/minute retriction

    return () => {
      clearInterval(interval);
    }
  }, [holdings])
  return (
    <>
      <Box m={1}>
        <PieChart portfolioValue={portfolioValue} cash={cash} holdingsValue={portfolioValue-cash} b="2rem"/>
      </Box>
      <Box>
        <StockChart/>
      </Box>
      {!holdings?.length ? <Button variant="contained" color="secondary" onClick={() => {toggleComponent('Order')}}>No Holdings: Buy Your First Stock</Button> : (
        <Box m={1}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Company</TableCell>
                  <TableCell align="right">Ticker</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Market Value</TableCell>
                  <TableCell align="right">Avg Book Cost</TableCell>
                  <TableCell align="right">Total Avg Cost</TableCell>
                  <TableCell align="right">Unrealized Gain/Loss</TableCell>
                  <TableCell align="right">% of Portfolio</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {holdingsPrices.map((holding: HoldingI) => (
                  <Holding key={holding.company} holding={holding} portfolioValue={portfolioValue}/>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Box>
        )
      }
  </>
  )
}