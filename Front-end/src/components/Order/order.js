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
import Box from '@material-ui/core/Box';
import { getMatchingStocks } from '../../api/backendApi';
import { getCurrentPrice } from '../../api/stockApi';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


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

  const [value, setValue] = React.useState('buy');

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

  const handleRadio = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
    setAction(event.target.value)
  };

  return (
    <Box m={1}>
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
          <RadioGroup row aria-label="action" name="action1" value={value} onChange={handleRadio}>
            <FormControlLabel value="buy" control={<Radio />} label="Buy" />
            <FormControlLabel value="sell" control={<Radio />} label="Sell" />
          </RadioGroup>
          <TextField type="number" name="quantity" label="Quantity" variant="outlined" fullWidth value={quantity} onChange={(e) => setQuantity( e.target.valueAsNumber )} />
          <TextField type="number" name="price" label="Price" variant="outlined" fullWidth value={price.toFixed(2)} />
          <TextField type="number" name="netAmount" label="NetAmount" variant="outlined" autoComplete="netAmount" fullWidth value={(price * quantity).toFixed(2)} />
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit Order</Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Order;
