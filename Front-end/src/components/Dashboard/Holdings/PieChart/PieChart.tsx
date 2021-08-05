import {useState} from 'react';
import Chart from 'react-apexcharts';
import {Paper, Box, Typography} from '@material-ui/core';

interface Props {
  
}

export const PieChart = ({ cash, portfolioValue, holdingsValue }: any) => {

  const [chart, setChart] = useState({
    series: [Number(holdingsValue.toFixed(2)), Number(cash.toFixed(2))],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Investments($)', 'Cash($)'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  });


  // create interfaces for props after the whole project is in typescript
  return (
      <Box width={0.27} >
      <Paper id="chart" >
        <Typography variant="h6">Total Value: ${portfolioValue}</Typography>
        <Chart options={chart.options} series={[Number(holdingsValue.toFixed(2)), Number(cash.toFixed(2))]} type="pie" width={380} />
      </Paper>
    </Box>
  )
}

