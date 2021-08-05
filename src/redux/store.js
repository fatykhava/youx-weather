import AppReducer from './reducers/appReducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';

const reducers = combineReducers({
  app: AppReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
