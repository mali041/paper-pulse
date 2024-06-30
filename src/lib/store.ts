// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import rootReducer from './rootReducer'; // Assuming you have a rootReducer file
import logger from 'redux-logger'; // Import logger middleware if needed

// Define middleware array
const middleware = [logger];

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });

let store: ReturnType<typeof makeStore> | undefined;

export const initializeStore = () => {
  let _store = store ?? makeStore();

  // For SSR, always create a new store instance
  if (typeof window === 'undefined') return _store;

  // Create the store once on the client side
  if (!store) store = _store;

  return _store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// Redux hooks with types
export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
