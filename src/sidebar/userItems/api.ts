import { from } from "rxjs";

import { getWithJwtAsync } from "lib/http";

import { IFolderChild, ItemTypeIds } from "sidebar/userItems/types";

export const getUserItemsObs = () =>
  from(
    Promise.all([
      getWithJwtAsync<IFolderChild[]>(
        `api/useritems/myitems?tenant=${process.env.TENANT_ID}&itemTypeIds=${
          ItemTypeIds.SYSTEM_DATAVIEW
        }&itemTypeIds=${ItemTypeIds.USER_DATAVIEW}&itemTypeIds=${
          ItemTypeIds.PAGE_BUILDER
        }`
      ),
      getWithJwtAsync<IFolderChild[]>(
        `api/useritems/sharedwithme?tenant=${
          process.env.TENANT_ID
        }&itemTypeIds=${ItemTypeIds.USER_DATAVIEW}
        &itemTypeIds=${ItemTypeIds.SYSTEM_DATAVIEW}&itemTypeIds=${
          ItemTypeIds.PAGE_BUILDER
        }`
      )
    ]).then(arrayResponse => ({
      myItems: arrayResponse[0],
      sharedWithMe: arrayResponse[1]
    }))
  );
