/* eslint-disable */
import React, { ReactElement, useState, useEffect } from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts';
import { useSelector } from 'react-redux';
import { getAllHoldings } from '../../../../actions/holdings';
import { getDataForCompanyWithSymbol } from '../../../../api/stockchartApi';
//import { NoPriceHoldingI } from '../../../../interfaces/Holding';

/* interface Stocks {
  date: Date[]
}
interface Date {
  '1. open': number,
  '2. high': number,
  '3. low': number,
  '4. close': number, 
} */

export const StockChart = () =>  {
  const [stockData, setStockData] = useState([]);
/* eslint-disable */
  const {holdings} = useSelector((state) => state.holdings);
  
  useEffect(() => {
    /* eslint-disable */
    //at the moment the stock graph only displayes the stock that you currently have the most money invested in
    const fet = async () => {
      let holding = await Promise.all(holdings);
      let maxInvestStock;
      let j = 0;
      maxInvestStock = holding[j];
      //console.log(maxInvestStock.quantity);
      for (let i = 0; i < holding.length; i++) {
        //console.log(holding[i+1].quantity);
        if (holding[i+1] && maxInvestStock && (maxInvestStock.quantity * maxInvestStock.avgCost) < (holding[i+1].quantity * holding[i+1].avgCost)) {
          maxInvestStock = holding[i+1];
        } 
      }
      const result = await getDataForCompanyWithSymbol(maxInvestStock.ticker);
      setStockData(formatStockData(result.data['Time Series (Daily)']));
    }
    fet()  
  }, [])    

  function formatStockData(stockData) {
    console.log(stockData);
    return Object.entries(stockData)?.map(entries => {
      const [date, value] = entries;
      //console.log(date, "date", value, "value");
      return {
        date,
        open: Number(value['1. open']),
        high: Number(value['2. high']),
        low: Number(value['3. low']),
        close: Number(value['4. close']),
      }  
    }) 
  } 

  return (
    //(stockData  && stockData.length) &&
      <CanvasJSChart
      
        options={ {
          data: [
            {
              type: 'candlestick',
              dataPoints: stockData?.map(stockData => 
                
                ({
                
                x: new Date(stockData.date),
                y: [
                  stockData.open,
                  stockData.high,
                  stockData.low,
                  stockData.close
                ]
              })
              )
            }
          ],
          axisY: {
            minimum: Math.min(...stockData.map(data => data.low)) / 1.1,
            maximum: Math.max(...stockData.map(data => data.high)) * 1.1,
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
          }
          }, 
          axisX: {
            scaleBreaks: {
              if (stockData) {
               customBreaks = stockData.reduce((breaks, value, index, array) => {
                const currentDataPointUnix = new Date(Number(value.date));
                const previousDataPointUnix = new Date(Number(array[index - 1].date));

                const oneDayInMs = 86400000;
                {console.log(array[index])}
                const difference = previousDataPointUnix - currentDataPointUnix;

                return (difference === oneDayInMs) ? breaks : 
                  [...breaks, {
                    startValue: currentDataPointUnix,
                    endValue: previousDataPointUnix - oneDayInMs,
                  }]
                
              }, [])
              }
              
            }
            
          },
          
        } }
      />  
  )
}

/* "2021-08-06": {
  "1. open": "143.0000",
  "2. high": "144.3900",
  "3. low": "142.8900",
  "4. close": "144.0900",
  "5. volume": "3826835"
} */
