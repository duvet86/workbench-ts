import { applyMiddleware, compose, createStore, Action } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { batchDispatchMiddleware } from "redux-batched-actions";
import { composeWithDevTools } from "redux-devtools-extension";

import { logger, monitorReducer } from "lib/middleware";

import rootEpic from "rootEpic";
import rootReducer, { RootState } from "rootReducer";

const configureStore = (preloadedState?: RootState) => {
  const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();

  const middlewares = [epicMiddleware, batchDispatchMiddleware];
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

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  epicMiddleware.run(rootEpic);

  return store;
};

export default configureStore;
