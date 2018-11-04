import { getWithJwtAsync } from "lib/http";
import { IComponentGroup } from "pagebuilder/types";

export const getComponentListAsync = (): Promise<IComponentGroup[]> =>
  getWithJwtAsync("api/pagebuilder/componentgroups?includeLegacy=false");
