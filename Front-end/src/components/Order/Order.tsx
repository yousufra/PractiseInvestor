/* eslint-disable */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, ReactElement, useEffect, } from 'react';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {TextField, Button, Typography, Paper, Tooltip} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Box from '@material-ui/core/Box';
import { DebounceInput } from 'react-debounce-input';
import { updateHoldings } from '../../actions/holdings';
import { getAllStocks } from '../../api/backendApi';
import { getCurrentPrice } from '../../api/stockApi';
import { SuggestionsStatePropertiesI } from '../../interfaces/Order';
import { BasicStockI } from '../../interfaces/Stock';

interface Props {
  toggleComponent: Function;
}

export default function order({toggleComponent}: Props): ReactElement {
  const { holdings, cash } = useSelector((state: any) => state.holdings);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [allStocks, setAllStocks] = useState<BasicStockI[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestionsStatePropertiesI[]>([]);
  const [company, setCompany] = useState<string>('');
  const [ticker, setTicker] = useState<string>('');
  const [action, setAction] = useState<string>('');
  const [date, setDate] = useState<string>(moment().format('MMMM Do YYYY'));
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const [value, setValue] = useState<string>('');

  useEffect(() => {
    // getting all stocks to filter them later instead of making one api call for each filter
    getAllStocks().then(res => setAllStocks(res.data));
  }, [])

  const handleChange = async (company) => {
    let matches: BasicStockI[] = [];
    if (company) {
      // filtering all companies that the name matches with the input
      const filteredStocks = allStocks.filter((stock: BasicStockI) => stock.name.toLowerCase().includes(company.toLowerCase()));
      // since some come duplicated we filter them again to remove duplicates
      filteredStocks.forEach((stock: BasicStockI) => {
        !matches.find(el => el.name === stock.name) && matches.push(stock);
      })
    }
    // setting the suggestions so they don't have any duplicates
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
    // checking if the form is entirely filled
    const holding = holdings.find(holding => holding.company === company);
    if (ticker && quantity && action) {
      // checking if the user already owns that holding
      if (!holding) {
        return alert("You do not own any shares of this company");
      }
      // checking if the type of action is sell
      if (holding  && action === 'sell')  {
        // checking if the user is trying to sell more than he currently own
        if (quantity <= holding.quantity) {
          dispatch(updateHoldings({ date, company, ticker, action, quantity, price, netAmount: Number((price * quantity).toFixed(2)) }));
          setCompany('');
          setTicker('');
          setAction('');
          setQuantity(0);
          setPrice(0);
          toggleComponent('Dashboard');
        } else {
          alert(`You currently own ${holding.quantity} shares from this company.`)
        }
      } else {
        // check cash
        const netAmount: number = Number((price * quantity).toFixed(2));
        if (cash >= netAmount) {
          dispatch(updateHoldings({ date, company, ticker, action, quantity, price, netAmount }));
          setCompany('');
          setTicker('');
          setAction('');
          setQuantity(0);
          setPrice(0);
          toggleComponent('Dashboard');
        } else {
          alert(`Not enough funds`);
        }
      }
    }
    else {
      alert('Please fill out all fields');
    }
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
