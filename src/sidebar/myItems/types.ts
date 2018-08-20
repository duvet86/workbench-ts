interface IShareDtc {
  ShareId: string;
  ItemId?: string;
  FolderId?: string;
  ShareWithUsername?: string;
  ShareWithGroupId?: string;
  DateTimeCreated?: Date;
  CreatedBy: string;
  Level: string;
  IsInherited: boolean;
  Label: string;
}

interface IFolderDtc {
  FolderId: string;
  TenantId: string;
  OwnerUsername: string;
  Label: string;
  Description: string;
  EffectiveShareLevel: string;
  Children: IFolderChild[];
  Shares: IShareDtc[];
}

interface IItemDtc {
  ItemId: string;
  TenantId: string;
  ItemTypeId?: string;
  OwnerUsername: string;
  Label: string;
  Description?: string;
  DateTimeCreated: Date;
  CreatedBy: string;
  DateTimeModified?: Date;
  ModifiedBy?: string;
  DataKeyGuid?: string;
  DataKeyNvarchar128?: string;
  Shares: IShareDtc[];
  ViewUrl?: string;
  AttributesUrl?: string;
  DeleteUrl?: string;
  ShareDeleteUpdateUrl?: string;
  EffectiveShareLevel?: string;
  FontAwesomeClass?: string;
  ItemTypeLabel?: string;
  ContextAttribute1?: string;
  ContextAttribute2?: string;
  ContextAttribute3?: string;
  IsArchived: boolean;
  ContextAttributes: { [key: string]: string };
}

export interface IFolderChild {
  ContentId: string;
  FolderId?: string;
  ChildType: string;
  ChildFolderId?: string;
  ChildItemId?: string;
  OwnerUsername: string;
  ChildFolder: IFolderDtc;
  ChildItem?: IItemDtc;
}
