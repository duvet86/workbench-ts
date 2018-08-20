import { from } from "rxjs";

import { getWithJwtAsync } from "lib/http";

import { IFolderChild } from "sidebar/myItems/types";

export const getMyItemsAsync = () =>
  from(
    Promise.all([
      getWithJwtAsync<IFolderChild[]>("api/useritems/myitems"),
      getWithJwtAsync<IFolderChild[]>("api/useritems/sharedwithme")
    ]).then(arrayResponse => ({
      myItems: arrayResponse[0],
      sharedWithMe: arrayResponse[1]
    }))
  );
