import currencyData from '../data/currencies.js';
import assign from 'object-assign';

const initialState = {
  frequency: 'single',
  amount: '',
  presets: currencyData.usd.presets.single,
  currency: currencyData['usd'],
  amountError: ''
};

const donateApp = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FREQUENCY':
      return assign({}, state, {
        frequency: action.data,
        presets: currencyData[state.currency.code].presets[action.data],
        amount: '',
        amountError: ''
      });
    case 'SET_AMOUNT':
      return assign({}, state, {
        amount: action.data,
        amountError: ''
      });
    case 'SET_AMOUNT_ERROR':
      return assign({}, state, {
        amountError: action.data
      });
    case 'SET_CURRENCY':
      return assign({}, state, {
        currency: action.data,
        presets: currencyData[action.data.code].presets[state.frequency],
        amount: '',
        amountError: ''
      });
    default:
      return state
  }
};

export default donateApp;
