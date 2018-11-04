export interface IComponent {
  GroupId: string;
  ComponentId: string;
  SortOrder: number;
  Title: string;
  Description: string;
  Icon: string;
  IsParameter: string;
  IsConfigurable: boolean;
  DefaultConfiguration: any;
  ConfigureUibModalSize: string;
  UseQesSession: boolean;
  IsHeightConfigurable: boolean;
  pIsLegacy: boolean;
}

export interface IComponentGroup {
  GroupId: string;
  Title: string;
  SortOrder: number;
  Components: IComponent[];
}
