import { from, Observable } from "rxjs";

import { getWithJwtAsync } from "lib/http";

import { IIntervalTypes } from "common/intervalSelector/types";

export const getIntervalTypesObs = (): Observable<IIntervalTypes[]> =>
  from(getWithJwtAsync("api/platform/intervaltypes"));

// FIX ME.
export const resolveIntervalObs = (intervalType: string, offset: number) =>
  from(
    getWithJwtAsync(
      `api/platform/interval/${intervalType}/resolve?offset=${offset}`
    )
  );
