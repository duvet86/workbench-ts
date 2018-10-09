import { applyMiddleware, compose, createStore, Action } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createEpicMiddleware } from "redux-observable";
import { enableBatching } from "redux-batched-actions";

import history from "lib/history";
import rootEpic from "rootEpic";
import rootReducer, { RootState } from "rootReducer";

const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();
const browserRouterMiddleware = routerMiddleware(history);

const middleware = [epicMiddleware, browserRouterMiddleware];

function configureStore() {
  const store = createStore(
    connectRouter(history)(enableBatching(rootReducer)),
    compose(applyMiddleware(...middleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
}

export default configureStore();
