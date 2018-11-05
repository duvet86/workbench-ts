import { applyMiddleware, compose, createStore, Action } from "redux";
import { History } from "history";
import { routerMiddleware } from "connected-react-router";
import { createEpicMiddleware } from "redux-observable";
import { batchDispatchMiddleware } from "redux-batched-actions";
import { composeWithDevTools } from "redux-devtools-extension";

import { logger, monitorReducer } from "lib/middleware";

import rootEpic from "rootEpic";
import createRootReducer, { RootState } from "rootReducer";

const configureStore = (history: History, preloadedState?: RootState) => {
  const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();
  const browserRouterMiddleware = routerMiddleware(history);

  const middlewares = [
    epicMiddleware,
    browserRouterMiddleware,
    batchDispatchMiddleware
  ];
  if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
  }

  const middlewareEnhancer = applyMiddleware(...middlewares);

  let composedEnhancers;
  if (process.env.NODE_ENV === "development") {
    composedEnhancers = composeWithDevTools(middlewareEnhancer, monitorReducer);
  } else {
    composedEnhancers = compose(middlewareEnhancer);
  }

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composedEnhancers
  );

  epicMiddleware.run(rootEpic);

  return store;
};

export default configureStore;
