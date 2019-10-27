import { Middleware, Dispatch } from "redux";
import { RootState } from "rootReducer";

const loggerMiddleware: Middleware<
  Dispatch,
  RootState,
  Dispatch
> = store => next => action => {
  console.group(action.type);
  console.info("Dispatching", action);
  const result = next(action);
  console.log("Next state", store.getState());
  console.groupEnd();

  return result;
};

export default loggerMiddleware;
