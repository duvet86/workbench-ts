import { applyMiddleware, compose, createStore, Action } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createEpicMiddleware } from "redux-observable";

import history from "lib/history";
import rootEpic from "rootEpic";
import rootReducer, { RootState } from "rootReducer";

const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();
const browserRouterMiddleware = routerMiddleware(history);

const middleware = [epicMiddleware, browserRouterMiddleware];

function configureStore() {
  const store = createStore(
    connectRouter(history)(rootReducer),
    compose(applyMiddleware(...middleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
}

export default configureStore();
