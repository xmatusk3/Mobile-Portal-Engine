import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import reducers from '../reducers';

const store = createStore(reducers, {}, applyMiddleware(...[promise, thunk]));

export default store;
