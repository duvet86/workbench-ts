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

interface IItemDtc {
  ItemId: string;
  TenantId: string;
  ItemTypeId: string;
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
  FolderId: string | null;
  ChildType: "F" | "I";
  ChildFolderId: string | null;
  ChildItemId: string | null;
  OwnerUsername: string | null;
  ChildFolder: IFolderDtc | null;
  ChildItem: IItemDtc | null;
}
