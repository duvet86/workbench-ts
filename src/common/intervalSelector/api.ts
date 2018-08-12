import { from } from "rxjs";

import { getWithJwtAsync } from "lib/http";

import { IIntervalTypes } from "common/intervalSelector/types";

export const getIntervalTypesObs = () =>
  from<IIntervalTypes[]>(getWithJwtAsync("api/platform/intervaltypes"));

export const resolveIntervalObs = (intervalType: string, offset: number) =>
  from(
    getWithJwtAsync(
      `api/platform/interval/${intervalType}/resolve?offset=${offset}`
    )
  );
