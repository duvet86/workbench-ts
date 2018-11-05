// tslint:disable:no-console
import { StoreCreator, Reducer, StoreEnhancer, Action } from "redux";
import { RootState } from "rootReducer";

const round = (n: number) => Math.round(n * 100) / 100;

const monitorReducerEnhancer = (createStore: StoreCreator) => (
  reducer: Reducer<RootState, Action>,
  initialState: RootState,
  enhancer: StoreEnhancer
) => {
  const monitoredReducer = (state: RootState | undefined, action: Action) => {
    const start = performance.now();
    const newState = reducer(state, action);
    const end = performance.now();
    const diff = round(end - start);
    console.log("Reducer process time:", diff);

    return newState;
  };

  return createStore(monitoredReducer, initialState, enhancer);
};

export default monitorReducerEnhancer;
