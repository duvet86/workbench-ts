import { from } from "rxjs";

import { getWithJwtAsync } from "lib/http";

export const getUserInfoAsync = () =>
  from(getWithJwtAsync("api/platform/myprofile"));
