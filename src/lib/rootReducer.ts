// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import paymentReducer from './features/payment/paymentSlice';
import wasteUsageReducer from './features/waste-usage/wasteUsageSlice';
import wasteStackReducer from './features/waste-stack/wasteStackSlice';
import wasteReceivedReducer from './features/waste-receive/wasteReceiveSlice';
import wasteReceiptReducer from './features/waste-receipt/wasteReceiptSlice';
import supplierReducer from './features/supplier/supplierSlice';

const rootReducer = combineReducers({
  payment: paymentReducer,
  wasteUsage: wasteUsageReducer,
  wasteStack: wasteStackReducer,
  wasteReceived: wasteReceivedReducer,
  wasteReceipt: wasteReceiptReducer,
  supplier: supplierReducer
});

export default rootReducer;
