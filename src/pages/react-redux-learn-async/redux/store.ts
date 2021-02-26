import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { reactReduxLearnReducer } from './reducer';
const loggerMiddleware = createLogger()

export const store = createStore(
  reactReduxLearnReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);