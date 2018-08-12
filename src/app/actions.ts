export const QES_ENABLED_REQUEST = "QES_ENABLED_REQUEST";
export type QES_ENABLED_REQUEST = typeof QES_ENABLED_REQUEST;

export const QES_ENABLED_SUCCESS = "QES_ENABLED_SUCCESS";
export type QES_ENABLED_SUCCESS = typeof QES_ENABLED_SUCCESS;

export const QES_ENABLED_ERROR = "QES_ENABLED_ERROR";
export type QES_ENABLED_ERROR = typeof QES_ENABLED_ERROR;

export interface IQesEnabledRequest {
  type: QES_ENABLED_REQUEST;
}

export interface IQesEnabledSuccess {
  isQesEnabled: boolean;
  type: QES_ENABLED_SUCCESS;
}

export interface IQesEnabledError {
  type: QES_ENABLED_ERROR;
  error: any;
}

export type AppAction =
  | IQesEnabledRequest
  | IQesEnabledSuccess
  | IQesEnabledError;

export const qesEnabledRequest = (): IQesEnabledRequest => ({
  type: QES_ENABLED_REQUEST
});

export const qesEnabledSuccess = (
  isQesEnabled: boolean
): IQesEnabledSuccess => ({
  isQesEnabled,
  type: QES_ENABLED_SUCCESS
});

export const qesEnabledError = (error: any): IQesEnabledError => ({
  error,
  type: QES_ENABLED_ERROR
});
