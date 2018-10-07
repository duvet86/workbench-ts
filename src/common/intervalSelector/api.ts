import { from, Observable } from "rxjs";

import { getWithJwtAsync } from "lib/http";
import {
  IIntervalDtc,
  ITypesAndInterval,
  IIntervalTypesDtc
} from "common/intervalSelector/types";

export const initIntervalObs = ({
  IntervalType,
  offset
}: IIntervalDtc): Observable<ITypesAndInterval> =>
  from(
    Promise.all([
      getWithJwtAsync<IIntervalTypesDtc[]>("api/platform/intervaltypes"),
      getWithJwtAsync<IIntervalDtc[]>(
        `api/platform/interval/${IntervalType}/resolve?offset=${offset}`
      )
    ]).then(arrayOfResponses => ({
      intervalTypes: arrayOfResponses[0],
      interval: arrayOfResponses[1][0]
    }))
  );

export const resolveIntervalObs = (
  intervalType: string,
  offset: number
): Observable<IIntervalDtc> =>
  from(
    getWithJwtAsync<IIntervalDtc[]>(
      `api/platform/interval/${intervalType}/resolve?offset=${offset}`
    ).then(intervalArray => intervalArray[0])
  );
