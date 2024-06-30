// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import paymentReducer from './features/payment/paymentSlice';

const rootReducer = combineReducers({
  payment: paymentReducer,
  // Add other reducers here
});

export default rootReducer;
