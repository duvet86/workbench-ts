import {
  applyMiddleware,
  compose,
  createStore,
  Action,
  Middleware
} from "redux";
import { createEpicMiddleware } from "redux-observable";
import { composeWithDevTools } from "redux-devtools-extension";

import { loggerMiddleware, monitorReducerEnhancer } from "lib/middleware";

import rootEpic from "rootEpic";
import rootReducer, { RootState } from "rootReducer";

const configureStore = (preloadedState?: RootState) => {
  const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();

  const middlewares: Middleware[] = [epicMiddleware];
  if (process.env.NODE_ENV === "development") {
    middlewares.push(loggerMiddleware);
  }

  const middlewareEnhancer = applyMiddleware(...middlewares);

  let composedEnhancers;
  if (process.env.NODE_ENV === "development") {
    composedEnhancers = composeWithDevTools(
      middlewareEnhancer,
      monitorReducerEnhancer
    );
  } else {
    composedEnhancers = compose(middlewareEnhancer);
  }

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  epicMiddleware.run(rootEpic);

  return store;
};

export default configureStore;
