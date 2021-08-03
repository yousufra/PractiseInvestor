/* eslint-disable */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  TextField, Button, Typography, Paper, Tooltip,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { DebounceInput } from 'react-debounce-input';
import { updateHoldings } from '../../actions/holdings';
import useStyles from './styles';
import { getMatchingStocks } from '../../api/backendApi';
import { getCurrentPrice } from '../../api/stockApi';

const Order = ({ toggleComponent }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [suggestions, setSuggestions] = useState([]);
  const [company, setCompany] = useState('');
  const [ticker, setTicker] = useState('');
  const [action, setAction] = useState('');
  const [date, setDate] = useState(moment().format('MMMM Do YYYY'));
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const handleChange = async (company) => {
    let matches = [];
    if (company.length > 0) {
      matches = (await getMatchingStocks(company)).data;
    }
    setSuggestions(matches);
  };

  const SuggestionHandler = async (company) => {
    setCompany(company.name);
    setSuggestions([]);
    setTicker(company.symbol);

    //set price here with real time api call
    const realTimePrice = Number((await getCurrentPrice(company.symbol)).data.price);
    setPrice(realTimePrice)
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent browser from refreshing , defualt when you submit a form
    dispatch(updateHoldings({ date, company, ticker, action, quantity, price, netAmount: Number((price * quantity).toFixed(2)) }));
    setCompany('');
    setTicker('');
    setAction('');
    setQuantity(0);
    setPrice(0);
    toggleComponent('Dashboard');
  };

  return (
    <Paper className={classes.paper}>
      <form className={`${classes.form} ${classes.root}`} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Typography variant="h6">Order</Typography>
        <TextField name="date" label="Date" variant="outlined" fullWidth value={date}/>
        <DebounceInput element={TextField} minLength={3} debounceTimeout={0} name="company" label="Company" variant="outlined" fullWidth value={company} onChange={(e) => handleChange(e.target.value)} />
        {suggestions && suggestions.map((suggestion) => (
          <Tooltip key={suggestion.name} title="Choose" arrow>
            <Button onClick={() => SuggestionHandler(suggestion)}>{ suggestion.name }</Button>
          </Tooltip>
        ))}
        <TextField name="ticker" label="Ticker" variant="outlined" fullWidth value={ticker} onChange={(e) => setTicker({ ticker })} />
        <TextField name="action" label="Action" variant="outlined" fullWidth value={action} onChange={(e) => setAction( e.target.value )} />
        <TextField type="number" name="quantity" label="Quantity" variant="outlined" fullWidth value={quantity} onChange={(e) => setQuantity( e.target.valueAsNumber )} />
        <TextField type="number" name="price" label="Price" variant="outlined" fullWidth value={price.toFixed(2)} />
        <TextField type="number" name="netAmount" label="NetAmount" variant="outlined" autoComplete="netAmount" fullWidth value={(price * quantity).toFixed(2)} />
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit Order</Button>
      </form>
    </Paper>
  );
};

export default Order;
