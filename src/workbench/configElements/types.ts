export interface IHelperText {
  title: string;
  text: string;
}

export interface IConfigSteps<T> {
  label: string;
  helper?: IHelperText;
  renderComponent: (element: T) => JSX.Element;
}
