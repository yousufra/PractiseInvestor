/* eslint-disable */
import { useState, useEffect } from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts';
import { useSelector } from 'react-redux';
import { getDataForCompanyWithSymbol } from '../../../../api/stockchartApi';
import { HoldingI } from '../../../../interfaces/Holding';
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

export const StockChart = ({selectedStock}) =>  {
  const [stockData, setStockData] = useState<any>([]);
/* eslint-disable */
  const { holdings } = useSelector((state: any) => state.holdings);
  
  useEffect(() => {
    /* eslint-disable */
    //at the moment the stock graph only displayes the stock that you currently have the most money invested in
    const fet = async () => {
      let holding: HoldingI[] = await Promise.all(holdings);
      let maxInvestStock;
      let j = 0;
      maxInvestStock = holding[j];
      for (let i = 0; i < holding.length; i++) {
        if (holding[i+1] && maxInvestStock && (maxInvestStock.quantity * maxInvestStock.avgCost) < (holding[i+1].quantity * holding[i+1].avgCost)) {
          maxInvestStock = holding[i+1];
        } 
      }
      const result = await getDataForCompanyWithSymbol(maxInvestStock.ticker);
      setStockData(formatStockData(result.data['Time Series (Daily)']));
    }
    fet() 
  }, [])
  useEffect(() => {
    /* eslint-disable */
    if (selectedStock.length !== 0) {
      const fet = async () => {
        let stock = selectedStock;
        const result = await getDataForCompanyWithSymbol(stock);
        if (result) {
          setStockData(formatStockData(result.data['Time Series (Daily)']));
        }
        
      }
      fet() 
    }
  }, [selectedStock])

  function formatStockData(stockData) {
    return Object.entries(stockData)?.map(entries => {
      const [date, value]: any = entries;
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
      <CanvasJSChart
        options={ {
          theme: "light2", // "light1", "light2", "dark1", "dark2"
	        title: {
		        text: ""
	        },
          
          data: [
            {
              type: 'candlestick',
              dataPoints: stockData?.map(stockData => 
                ({
                x: new Date (stockData.date),
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
            title: "Price",
            minimum: Math.min(...stockData.map(data => data.low)) / 1.1,
            maximum: Math.max(...stockData.map(data => data.high)) * 1.1,
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
          }
          }, 
          axisX: {
            interval: 1,
            
            
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













// import { useState, useEffect } from 'react'
// import { CanvasJSChart } from 'canvasjs-react-charts';
// import { useSelector } from 'react-redux';

// import { getDataForCompanyWithSymbol } from '../../../../api/stockchartApi';
// import { NoPriceHoldingI } from '../../../../interfaces/Holding';

// interface Stocks {
//   date: Date[]
// }
// interface Date {
//   '1. open': string,
//   '2. high': string,
//   '3. low': string,
//   '4. close': string, 
// }

// export const StockChart = () =>  {
//   const [stockData, setStockData] = useState<any[]>([]);
//   const { holdings } = useSelector((state: { holdings: { holdings: NoPriceHoldingI[] } }) => state.holdings);
 
//   useEffect(() => {
//     const apiCallArray = async () => {
//       holdings?.map(async (holding: NoPriceHoldingI) => {
//         const ticker = await holding.ticker;
//         const result = await getDataForCompanyWithSymbol(ticker)
//         console.log(result.data);
//         return result.data;
//     }, []);
//       const result = await apiCallArray();
//       console.log(result)
//       const getChartDataForHolding = await Promise.all(apiCallArray);

//       console.log(getChartDataForHolding);

//       setStockData(formatStockData(getChartDataForHolding.map(holding => holding['Time Series (daily)']))); 
//     }
    
//   })    

//   return (
    
//       <CanvasJSChart
//         options={ {
//           axisX: {
//             scaleBreaks: {
//               customBreaks: stockData.reduce((breaks, value, index, array) => {
//                 const currentDataPointUnix = Number(new Date(value.date));
//                 const previousDataPointUnix = Number(new Date(array[index - 1].date));

//                 const oneDayInMs = 86400000;

//                 const difference = previousDataPointUnix - currentDataPointUnix;

//                 return difference === oneDayInMs ? breaks : [
//                   ...breaks, {
//                     startValue: currentDataPointUnix,
//                     endValue: previousDataPointUnix - oneDayInMs,
//                   }
//                 ]
//               }, [])
//             }
//           },
//           data: [
//             {
//               type: 'candlestick',
//               dataPoints: stockData.map(stockData => ({
//                 x: new Date(stockData.date),
//                 y: [
//                   stockData.open,
//                   stockData.high,
//                   stockData.low,
//                   stockData.close
//                 ]
//               }))
//             }
//           ]
//         } }
//       />  
//   )
// }

// /* "2021-08-06": {
//   "1. open": "143.0000",
//   "2. high": "144.3900",
//   "3. low": "142.8900",
//   "4. close": "144.0900",
//   "5. volume": "3826835"
// } */
//  function formatStockData(stockData) {
//    return Object.entries(stockData).map(entries => {
//     const [date, value] = entries;

//     /*  return [
//       date, 
//       open =  Number(date['1. open']),
//       high: Number(date['2. high']),
//       low: Number(date['3. low']),
//       close: Number(date['4. close']),
//     ] */ 
//   }) 
// } 
