import { routerMiddleware } from "react-router-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";

import history from "lib/history";
import rootEpic from "rootEpic";
import rootReducer from "rootReducer";

const epicMiddleware = createEpicMiddleware(rootEpic);
const browserRouterMiddleware = routerMiddleware(history);

const middleware = [epicMiddleware, browserRouterMiddleware];

const configureStore = () =>
  createStore(rootReducer, compose(applyMiddleware(...middleware)));

export default configureStore;
