import { getWithJwtAsync } from "lib/http";
import {
  IIntervalDtc,
  ITypesAndInterval,
  IIntervalTypesDtc
} from "common/intervalSelector/types";

export const initIntervalAsync = (
  initInterval: IIntervalDtc
): Promise<ITypesAndInterval> =>
  Promise.all([
    getWithJwtAsync<IIntervalTypesDtc[]>("api/platform/intervaltypes"),
    resolveIntervalAsync(initInterval.IntervalType, initInterval.offset)
  ]).then(arrayOfResponses => ({
    intervalTypes: arrayOfResponses[0],
    interval: {
      ...initInterval,
      ...arrayOfResponses[1]
    }
  }));
// .catch((resp: IErrorResponse) => {
//   store.dispatch(batchActions(handleException(resp)));
// });

export const resolveIntervalAsync = (
  intervalType: string,
  offset: number
): Promise<IIntervalDtc> =>
  getWithJwtAsync<IIntervalDtc[]>(
    `api/platform/interval/${intervalType}/resolve?offset=${offset}`
  ).then(intervalArray => intervalArray[0]);
// .catch((resp: IErrorResponse) => {
//   store.dispatch(batchActions(handleException(resp)));
// });
