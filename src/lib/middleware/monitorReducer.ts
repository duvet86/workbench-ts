// tslint:disable:no-console
import { AnyAction, Reducer, StoreEnhancer, Action, DeepPartial } from "redux";

const round = (n: number) => Math.round(n * 100) / 100;

const monitorReducerEnhancer: StoreEnhancer = next => <
  S,
  A extends Action = AnyAction
>(
  reducer: Reducer<S, A>,
  preloadedState?: DeepPartial<S>
) => {
  const monitoredReducer: Reducer<S, A> = (state, action) => {
    const start = performance.now();
    const newState = reducer(state, action);
    const end = performance.now();
    const diff = round(end - start);
    console.log("Reducer process time:", diff);

    return newState;
  };

  return next(monitoredReducer, preloadedState);
};

export default monitorReducerEnhancer;
