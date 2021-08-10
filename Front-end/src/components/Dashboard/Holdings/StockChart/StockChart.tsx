import { useState, useEffect } from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts';
import { useSelector } from 'react-redux';

import { getDataForCompanyWithSymbol } from '../../../../api/stockchartApi';
import { NoPriceHoldingI } from '../../../../interfaces/Holding';

interface Stocks {
  date: Date[]
}
interface Date {
  '1. open': string,
  '2. high': string,
  '3. low': string,
  '4. close': string, 
}

export const StockChart = () =>  {
  const [stockData, setStockData] = useState<any[]>([]);
  const { holdings } = useSelector((state: { holdings: { holdings: NoPriceHoldingI[] } }) => state.holdings);
 
  useEffect(() => {
    const apiCallArray = async () => {
      holdings?.map(async (holding: NoPriceHoldingI) => {
        const ticker = await holding.ticker;
        const result = await getDataForCompanyWithSymbol(ticker)
        console.log(result.data);
        return result.data;
    }, []);
      const result = await apiCallArray();
      console.log(result)
      const getChartDataForHolding = await Promise.all(apiCallArray);

      console.log(getChartDataForHolding);

      setStockData(formatStockData(getChartDataForHolding.map(holding => holding['Time Series (daily)']))); 
    }
    
  })    

  return (
    
      <CanvasJSChart
        options={ {
          axisX: {
            scaleBreaks: {
              customBreaks: stockData.reduce((breaks, value, index, array) => {
                const currentDataPointUnix = Number(new Date(value.date));
                const previousDataPointUnix = Number(new Date(array[index - 1].date));

                const oneDayInMs = 86400000;

                const difference = previousDataPointUnix - currentDataPointUnix;

                return difference === oneDayInMs ? breaks : [
                  ...breaks, {
                    startValue: currentDataPointUnix,
                    endValue: previousDataPointUnix - oneDayInMs,
                  }
                ]
              }, [])
            }
          },
          data: [
            {
              type: 'candlestick',
              dataPoints: stockData.map(stockData => ({
                x: new Date(stockData.date),
                y: [
                  stockData.open,
                  stockData.high,
                  stockData.low,
                  stockData.close
                ]
              }))
            }
          ]
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
 function formatStockData(stockData) {
   return Object.entries(stockData).map(entries => {
    const [date, value] = entries;

    /*  return [
      date, 
      open =  Number(date['1. open']),
      high: Number(date['2. high']),
      low: Number(date['3. low']),
      close: Number(date['4. close']),
    ] */ 
  }) 
} 
