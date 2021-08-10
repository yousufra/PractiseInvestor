/* eslint-disable */
import { useState, useEffect } from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts';
import { useSelector } from 'react-redux';
import { getDataForCompanyWithSymbol } from '../../../../api/stockchartApi';
import { HoldingI } from '../../../../interfaces/Holding';


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
    <div style={{ padding: "1.5rem 0 1.5rem 5rem", display: 'flex', justifyContent: 'center' }}>
      <CanvasJSChart
        options={ {
          theme: "light2", // "light1", "light2", "dark1", "dark2"
	        title: {
		        text: ""
	        },
          width: 1000,
          height: 350,
          // backgroundColor: "red",
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
    </div>
  )

}