interface IShareDtc {
  ShareId: string;
  ItemId: string;
  FolderId: string | null;
  ShareWithUsername: string | null;
  ShareWithGroupId: string | null;
  DateTimeCreated: Date;
  CreatedBy: string;
  Level: string;
  IsInherited: boolean;
  Label: string | null;
}

interface IFolderDtc {
  FolderId: string;
  TenantId: string | null;
  OwnerUsername: string;
  Label: string;
  Description: string | null;
  EffectiveShareLevel: string;
  Children: IFolderChild[];
  Shares: IShareDtc[];
}

export enum ItemTypeIds {
  SYSTEM_DATAVIEW = "6E564BC0-4D16-4714-9F4B-F8B7C9B25CA6",
  USER_DATAVIEW = "67B4E477-8498-4DEB-B282-575CCE1403EE",
  PAGE_BUILDER = "CF84574A-745A-462F-A567-E20F7D57FEF8"
}

export interface IItemDtc {
  ItemId: string;
  TenantId: string;
  ItemTypeId: ItemTypeIds;
  ItemTypelabel: string;
  OwnerUsername: string;
  Label: string;
  Description: string | null;
  DateTimeCreated: Date;
  CreatedBy: string;
  DateTimeModified: Date | null;
  ModifiedBy: string | null;
  DataKeyGuid: string | null;
  DataKeyNvarchar128: string | null;
  Shares: IShareDtc[];
  ViewUrl: string | null;
  AttributesUrl: string | null;
  DeleteUrl: string | null;
  ShareDeleteUpdateUrl: string | null;
  EffectiveShareLevel: string;
  FontAwesomeClass: string | null;
  ContextAttribute1: string | null;
  ContextAttribute2: string | null;
  ContextAttribute3: string | null;
  IsArchived: boolean;
  ContextAttributes: { [key: string]: string };
}

export interface IFolderChild {
  ContentId: string;
  FolderId: string;
  ChildType: "F" | "I";
  ChildFolderId: string;
  ChildFolder: IFolderDtc;
  ChildItemId: string;
  ChildItem: IItemDtc;
  OwnerUsername: string;
}

export interface ISideBarItems {
  myItems: IFolderChild[];
  sharedWithMe: IFolderChild[];
}
