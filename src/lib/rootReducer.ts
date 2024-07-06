// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import paymentReducer from './features/payment/paymentSlice';
import wasteUsageReducer from './features/waste-usage/wasteUsageSlice';
import wasteStackReducer from './features/waste-stack/wasteStackSlice';
import wasteReceivedReducer from './features/waste-receive/wasteReceiveSlice';
import wasteReceiptReducer from './features/waste-receipt/wasteReceiptSlice';
import supplierReducer from './features/supplier/supplierSlice';
import wasteTypeReducer from './features/waste-type/wasteTypeSlice';

const rootReducer = combineReducers({
  payment: paymentReducer,
  supplier: supplierReducer,
  wasteReceipt: wasteReceiptReducer,
  wasteReceived: wasteReceivedReducer,
  wasteStack: wasteStackReducer,
  wasteType: wasteTypeReducer,
  wasteUsage: wasteUsageReducer,
});

export default rootReducer;
