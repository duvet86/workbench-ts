import { applyMiddleware, compose, createStore } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createEpicMiddleware } from "redux-observable";

import history from "lib/history";
import rootEpic from "rootEpic";
import rootReducer from "rootReducer";

const epicMiddleware = createEpicMiddleware();
const browserRouterMiddleware = routerMiddleware(history);

const middleware = [epicMiddleware, browserRouterMiddleware];

export default function configureStore() {
  const store = createStore(
    connectRouter(history)(rootReducer),
    compose(applyMiddleware(...middleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
}
