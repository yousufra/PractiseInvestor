import React, {useState} from 'react';
import useStyles from './styles';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {updateHoldings} from '../../actions/holdings'

const Order = () => {
  const [order, setOrder] = useState({
    date: '',
    company: '',
    ticker: '',
    action: '',
    quantity: 0,
    price: 0,
    netAmount: 0
  })

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault(); //prevent browser from refreshing , defualt when you submit a form
    dispatch(updateHoldings(order));
    setOrder({
      date: '',
      company: '',
      ticker: '',
      action: '',
      quantity: 0,
      price: 0,
      netAmount: 0
    });
  }

  return (
    <Paper className={classes.paper}>
      <form className={`${classes.form} ${classes.root}`} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Typography variant="h6">Order</Typography>
        <TextField name="date" label="Date" variant="outlined" fullWidth value={order.date} onChange={(e)=> setOrder({...order, date: e.target.value})}/>
        <TextField name="company" label="Company" variant="outlined" fullWidth value={order.company} onChange={(e)=> setOrder({...order, company: e.target.value})}/>
        <TextField name="ticker" label="Ticker" variant="outlined" fullWidth value={order.ticker} onChange={(e)=> setOrder({...order, ticker: e.target.value})}/>
        <TextField name="action" label="Action" variant="outlined" fullWidth value={order.action} onChange={(e)=> setOrder({...order, action: e.target.value})}/>
        <TextField type="number" name="quantity" label="Quantity" variant="outlined" fullWidth value={order.quantity} onChange={(e)=> setOrder({...order, quantity: e.target.valueAsNumber})}/>
        <TextField type="number" name="price" label="Price" variant="outlined" fullWidth value={order.price} onChange={(e)=> setOrder({...order, price: e.target.valueAsNumber})}/>
        <TextField type="number" name="netAmount" label="NetAmount" variant="outlined" fullWidth value={order.netAmount} onChange={(e)=> setOrder({...order, netAmount: e.target.valueAsNumber})}/>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit Order</Button>
      </form>
    </Paper>
  )
}

export default Order
