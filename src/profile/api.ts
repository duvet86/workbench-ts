import { from, Observable } from "rxjs";

import { getWithJwtAsync } from "lib/http";
import { IUserInfo } from "profile/types";

export const getUserInfoAsync = (): Observable<IUserInfo> =>
  from(getWithJwtAsync("api/platform/myprofile"));
