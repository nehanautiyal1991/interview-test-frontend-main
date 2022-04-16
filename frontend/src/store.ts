import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { useSelector as useReduxSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import rootReducers from './redux/reducer/index';

const initState = { cart: [], products: [] };

const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(rootReducers, initState, composeEnhancer(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default store;
