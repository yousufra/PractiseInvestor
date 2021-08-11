import {useState} from 'react';
import Chart from 'react-apexcharts';
import {Paper, Box, Typography} from '@material-ui/core';
import {ChartI} from '../../../../interfaces/Chart'

interface Props {
  cash: number
  portfolioValue: number
  holdingsValue: number
  b: string
}

export const PieChart = ({ cash, portfolioValue, holdingsValue }: Props) => {
  const [chart, setChart] = useState<ChartI>({
    series: [Number(holdingsValue), Number(cash)],
    options: {
      chart: {
        width: 300,
        type: 'pie',
      },
      labels: ['Investments($)', 'Cash($)'],
      responsive: [{
        breakpoint: 1000,
        options: {
          chart: {
            width: 280
          },
          legend: {
            position: 'bottom',
            horizontalAlign: 'center'
          }
        }
      },
      {
        breakpoint: 800,
        options: {
          chart: {
            width: 230,
            offsetX: -50
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 1300,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom',
            horizontalAlign: 'center'
          }
        }
      }]
    },
  });

  return (
      <Box width={0.27}>
      <Paper id="chart" style={{width: "25vw", padding: "3rem"}} >
        <Typography variant="h6" data-testid="pieChart-portfolioValue" style={{ textAlign: 'center'}}>Total Value: ${portfolioValue}</Typography>
        <Typography variant="h6" data-testid="pieChart-cash" style={{ textAlign: 'center'}} >Your Funds: ${cash?.toFixed(2)}</Typography>
        <Chart options={chart.options} series={[Number(holdingsValue), Number(cash)]} type="pie" width={380} data-testid="pieChart-chart"/>
      </Paper>
    </Box>
  )
}

