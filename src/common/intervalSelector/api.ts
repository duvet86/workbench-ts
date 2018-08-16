import { from, Observable } from "rxjs";

import { getWithJwtAsync } from "lib/http";

import { IIntervalDtc, IIntervalTypesDtc } from "common/intervalSelector/types";

export const getIntervalTypesObs = (): Observable<IIntervalTypesDtc[]> =>
  from(getWithJwtAsync("api/platform/intervaltypes"));

export const resolveIntervalObs = (
  intervalType: string,
  offset: number
): Observable<IIntervalDtc[]> =>
  from(
    getWithJwtAsync(
      `api/platform/interval/${intervalType}/resolve?offset=${offset}`
    )
  );
