import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
// Redux's actions only return objects and
// by using thunk, it lets us to make redux actions return functions
import thunk from 'redux-thunk';

import { appReducer, userReducer } from 'redux/reducers/reducers';

export function config(initialState = {}) {
  var reducer = combineReducers({
    app: appReducer,
    user: userReducer
  });

  var store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      process.env.NODE_ENV === 'production'
        ? f => f
        : window.devToolsExtension ? window.devToolsExtension() : f => f // To enable redux console on browser
    )
  );

  return store;
}
