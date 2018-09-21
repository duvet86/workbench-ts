import { from } from "rxjs";

import { getWithJwtAsync } from "lib/http";

import { IFolderChild } from "sidebar/myItems/types";

const SYSTEM_DATAVIEW_ITEMTYPEID = "6e564bc0-4d16-4714-9f4b-f8b7c9b25ca6";
const PAGE_BUILDER_ITEMTYPEID = "CF84574A-745A-462F-A567-E20F7D57FEF8";

export const getMyItemsObs = () =>
  from(
    Promise.all([
      getWithJwtAsync<IFolderChild[]>(
        `api/useritems/myitems?tenant=${
          process.env.TENANT_ID
        }&itemTypeIds=${SYSTEM_DATAVIEW_ITEMTYPEID}&itemTypeIds=${PAGE_BUILDER_ITEMTYPEID}`
      ),
      getWithJwtAsync<IFolderChild[]>(
        `api/useritems/sharedwithme?tenant=${
          process.env.TENANT_ID
        }&itemTypeIds=${SYSTEM_DATAVIEW_ITEMTYPEID}&itemTypeIds=${PAGE_BUILDER_ITEMTYPEID}`
      )
    ]).then(arrayResponse => ({
      myItems: arrayResponse[0],
      sharedWithMe: arrayResponse[1]
    }))
  );
