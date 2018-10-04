export const enum IntervalTypes {
  ALLTIME = "ALLTIME",
  BIHOURLY = "BIHOURLY",
  DATEOPRANGE = "DATEOPRANGE",
  DATEOPRANGESHIFT = "DATEOPRANGESHIFT",
  DATETIMERANGE = "DATETIMERANGE",
  HOUR = "HOUR",
  WEEK = "WEEK",
  DATEOP = "DATEOP",
  CALENDARPERIOD = "CALENDARPERIOD",
  CALENDARPERIODTODATE = "CALENDARPERIODTODATE",
  CALENDARQUARTER = "CALENDARQUARTER",
  CALENDARYER = "CALENDARYER",
  SHIFTHOUR = "SHIFTHOUR"
}

export interface IIntervalTypesDtc {
  IntervalType: string;
  Label: string;
  SmartIntervals: Array<{ Key: string }>;
}

export interface IIntervalDtc {
  IntervalType: string;
  IntervalString?: string;
  FullLabel?: string;
  Label?: string;
  offset: number;
}
