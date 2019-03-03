import { from, Observable } from "rxjs";

import { getWithJwtAsync } from "lib/http";
import { IUserInfo } from "profile/types";

export const getUserInfoObs = (): Observable<IUserInfo> =>
  from(getWithJwtAsync<IUserInfo>("api/platform/myprofile"));
