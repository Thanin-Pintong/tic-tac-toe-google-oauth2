import { combineReducers } from 'redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from "./board/reducer";

/*
import { combineReducers } from 'redux';
import _bookReducer from './book-reducer';
import _tempReducer from './temp-reducer';

const rootReducer = () => combineReducers({
    bookReducer: _bookReducer,
    tempReducer: _tempReducer
});

export default rootReducer;

import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer  from './app-state';

const bindMiddleware = middleware => {
    return applyMiddleware(...middleware);
};

const configureStore = (initialState = {}) => {
    return createStore(rootReducer(), initialState, bindMiddleware([thunk, logger]));
}

export default configureStore;

*/
const rootReducer = () => combineReducers({
    state: reducer
});

const bindMiddleware = (middleware) => {
    return applyMiddleware(...middleware);
};

const store = (initialState = {}) => {
    return createStore(rootReducer(), initialState, bindMiddleware([thunk]));
}

export default store;
