export const ERROR_TRIGGER = "ERROR_TRIGGER";
export type ERROR_TRIGGER = typeof ERROR_TRIGGER;

export interface IErrorAction {
  error: any;
  type: "ERROR_TRIGGER";
}

export const triggerError = (error: any): IErrorAction => ({
  error,
  type: ERROR_TRIGGER
});
