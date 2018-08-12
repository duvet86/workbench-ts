import { from } from "rxjs";

import { getWithJwtAsync } from "lib/http";

// TODO: fix me;
export const getMyItemsAsync = () =>
  from(
    Promise.all([
      getWithJwtAsync("api/useritems/myitems"),
      getWithJwtAsync("api/useritems/sharedwithme")
    ]).then(arrayResponse => ({
      myItems: arrayResponse[0],
      sharedWithMe: arrayResponse[1]
    }))
  );
