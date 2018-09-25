import { from } from "rxjs";

import { getWithJwtAsync } from "lib/http";

import { IFolderChild, ItemTypeIds } from "sidebar/myItems/types";

export const getMyItemsObs = () =>
  from(
    Promise.all([
      getWithJwtAsync<IFolderChild[]>(
        `api/useritems/myitems?tenant=${process.env.TENANT_ID}&itemTypeIds=${
          ItemTypeIds.SYSTEM_DATAVIEW
        }&itemTypeIds=${ItemTypeIds.PAGE_BUILDER}`
      ),
      getWithJwtAsync<IFolderChild[]>(
        `api/useritems/sharedwithme?tenant=${
          process.env.TENANT_ID
        }&itemTypeIds=${ItemTypeIds.SYSTEM_DATAVIEW}&itemTypeIds=${
          ItemTypeIds.PAGE_BUILDER
        }`
      )
    ]).then(arrayResponse => ({
      myItems: arrayResponse[0],
      sharedWithMe: arrayResponse[1]
    }))
  );
