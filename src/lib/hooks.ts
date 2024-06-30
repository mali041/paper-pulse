// hooks.ts
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector, useStore as useReduxStore } from 'react-redux';
import type { RootState, AppDispatch, AppStore } from './store';

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useStore = () => useReduxStore<AppStore>();
