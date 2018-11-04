import { applyMiddleware, compose, createStore, Action } from "redux";
import { routerMiddleware } from "connected-react-router";
import { createEpicMiddleware } from "redux-observable";
import { batchDispatchMiddleware } from "redux-batched-actions";

import history from "lib/history";
import rootEpic from "rootEpic";
import createRootReducer, { RootState } from "rootReducer";

const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();
const browserRouterMiddleware = routerMiddleware(history);

const middleware = [
  epicMiddleware,
  browserRouterMiddleware,
  batchDispatchMiddleware
];

function configureStore() {
  const store = createStore(
    createRootReducer(history),
    compose(applyMiddleware(...middleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
}

export default configureStore();
