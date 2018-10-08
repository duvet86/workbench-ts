import { getWithJwtAsync } from "lib/http";
import {
  IIntervalDtc,
  ITypesAndInterval,
  IIntervalTypesDtc
} from "common/intervalSelector/types";

export const initIntervalAsync = (
  initInterval?: IIntervalDtc
): Promise<ITypesAndInterval> =>
  Promise.all([
    getWithJwtAsync<IIntervalTypesDtc[]>("api/platform/intervaltypes"),
    initInterval != null
      ? getWithJwtAsync<IIntervalDtc[] | undefined>(
          `api/platform/interval/${initInterval.IntervalType}/resolve?offset=${
            initInterval.offset
          }`
        )
      : undefined
  ]).then(arrayOfResponses => ({
    intervalTypes: arrayOfResponses[0],
    interval:
      arrayOfResponses[1] != null
        ? {
            ...initInterval,
            ...arrayOfResponses[1][0]
          }
        : undefined
  }));

export const resolveIntervalAsync = (
  intervalType: string,
  offset: number
): Promise<IIntervalDtc> =>
  getWithJwtAsync<IIntervalDtc[]>(
    `api/platform/interval/${intervalType}/resolve?offset=${offset}`
  ).then(intervalArray => intervalArray[0]);
