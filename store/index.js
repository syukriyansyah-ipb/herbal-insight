'use client'
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

let composeEnhancers = compose;

if (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(...middleware)
  )
);

export default store;
