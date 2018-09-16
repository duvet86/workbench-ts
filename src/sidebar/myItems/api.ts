import { from } from "rxjs";

import { getWithJwtAsync } from "lib/http";

import { IFolderChild } from "sidebar/myItems/types";

const SYSTEM_DATAVIEW_ITEMTYPEID = "6e564bc0-4d16-4714-9f4b-f8b7c9b25ca6";

export const getMyItemsObs = () =>
  from(
    Promise.all([
      getWithJwtAsync<IFolderChild[]>(
        `api/useritems/myitems?itemTypeIds=${SYSTEM_DATAVIEW_ITEMTYPEID}`
      ),
      getWithJwtAsync<IFolderChild[]>(
        `api/useritems/sharedwithme?itemTypeIds=${SYSTEM_DATAVIEW_ITEMTYPEID}`
      )
    ]).then(arrayResponse => ({
      myItems: arrayResponse[0],
      sharedWithMe: arrayResponse[1]
    }))
  );
