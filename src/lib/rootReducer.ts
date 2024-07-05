// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import paymentReducer from './features/payment/paymentSlice';
import wasteUsageReducer from './features/waste-usage/wasteUsageSlice';
import wasteStackReducer from './features/waste-stack/wasteStackSlice';

const rootReducer = combineReducers({
  payment: paymentReducer,
  wasteUsage: wasteUsageReducer,
  wasteStack: wasteStackReducer
});

export default rootReducer;
