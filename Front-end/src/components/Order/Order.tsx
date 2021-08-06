/* eslint-disable */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, ReactElement, } from 'react';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import {TextField, Button, Typography, Paper, Tooltip} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Box from '@material-ui/core/Box';
import { DebounceInput } from 'react-debounce-input';
import { updateHoldings } from '../../actions/holdings';
import { getMatchingStocks } from '../../api/backendApi';
import { getCurrentPrice } from '../../api/stockApi';

import { CompanyStatePropertiesI, SuggestionsStatePropertiesI } from '../../interfaces/Order';

interface Props {
  toggleComponent:any;
}

export default function order({toggleComponent}: Props): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [suggestions, setSuggestions] = useState<SuggestionsStatePropertiesI[]>([]);
  const [company, setCompany] = useState<any>([]);
  const [ticker, setTicker] = useState('');
  const [action, setAction] = useState('');
  const [date, setDate] = useState(moment().format('MMMM Do YYYY'));
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const [value, setValue] = React.useState('');

  const handleChange = async (company) => {
    let matches: CompanyStatePropertiesI[] = [];
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
    const realTimePrice:number = Number((await getCurrentPrice(company.symbol)).data.price);
    setPrice(realTimePrice)
  }

  const handleSubmit = (e:any) => {

    e.preventDefault(); // prevent browser from refreshing , defualt when you submit a form
    dispatch(updateHoldings({ date, company, ticker, action, quantity, price, netAmount: Number((price * quantity).toFixed(2)) }));
    setCompany('');
    setTicker('');
    setAction('');
    setQuantity(0);
    setPrice(0);
    toggleComponent('Dashboard');
  };

  const handleRadio = (event: { target: { value: React.SetStateAction<string>; }; }) => {
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
          {suggestions && suggestions.map((suggestion: SuggestionsStatePropertiesI) => (
            <Tooltip key={suggestion.name} title="Choose" arrow>
              <Button onClick={() => SuggestionHandler(suggestion)}>{ suggestion.name }</Button>
            </Tooltip>
          ))}
          <TextField name="ticker" label="Ticker" variant="outlined" fullWidth value={ticker} onChange={(e) => setTicker( ticker )} />
          <RadioGroup row aria-label="action" name="action1" value={value} onChange={handleRadio}>
            <FormControlLabel value="buy" control={<Radio color="primary"/>} label="Buy" />
            <FormControlLabel value="sell" control={<Radio color="primary"/>} label="Sell" />
          </RadioGroup>
          <TextField type="number" name="quantity" InputProps={{inputProps: { min: 0 }}} label="Quantity" variant="outlined" fullWidth defaultValue={quantity} onChange={(e) => setQuantity(+e.target.value)} />
          <TextField type="number" name="price" label="Price" variant="outlined" fullWidth value={price.toFixed(2)} />
          <TextField type="number" name="netAmount" label="NetAmount" variant="outlined" autoComplete="netAmount" fullWidth value={(price * quantity).toFixed(2)} />
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit Order</Button>
        </form>
      </Paper>
    </Box>
  );
}
