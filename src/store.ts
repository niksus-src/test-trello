import {createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import reducer from './reducer'
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
store.subscribe(()=>console.log('storeChange', store.getState()));

export type State = ReturnType<typeof store.getState>;
export default store;
