// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import paymentReducer from './features/payment/paymentSlice';
import wasteUsageReducer from './features/waste-usage/wasteUsageSlice';

const rootReducer = combineReducers({
  payment: paymentReducer,
  wasteUsage: wasteUsageReducer,
});

export default rootReducer;
