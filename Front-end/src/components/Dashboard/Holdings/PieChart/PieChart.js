/* eslint-disable */
import React, {useState} from 'react';
import Chart from 'react-apexcharts';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const PieChart = ({ cash, portfolioValue, holdingsValue }) => {

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

  return (
    <Box width={0.27} >
      <Paper id="chart" >
        <Typography variant="h6">Total Value: ${portfolioValue}</Typography>
        <Chart options={chart.options} series={[Number(holdingsValue.toFixed(2)), Number(cash.toFixed(2))]} type="pie" width={380} />
      </Paper>
    </Box>
  )
}

export default PieChart;
