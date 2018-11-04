import { applyMiddleware, compose, createStore, Action } from "redux";
import { History } from "history";
import { routerMiddleware } from "connected-react-router";
import { createEpicMiddleware } from "redux-observable";
import { batchDispatchMiddleware } from "redux-batched-actions";

import rootEpic from "rootEpic";
import createRootReducer, { RootState } from "rootReducer";

const configureStore = (history: History) => {
  const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();
  const browserRouterMiddleware = routerMiddleware(history);

  const middleware = [
    epicMiddleware,
    browserRouterMiddleware,
    batchDispatchMiddleware
  ];

  const store = createStore(
    createRootReducer(history),
    compose(applyMiddleware(...middleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
};

export default configureStore;
