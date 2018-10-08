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

export interface ISmartInterval {
  smartIntervalKey: string | null;
  intervalString: string | null;
}

export interface IShiftDtc {
  DateOp: Date;
  Shift: string;
  Description: string;
  TimeStart: Date;
  Order: number;
  Label: string;
  DurationMinutes: number;
}

export interface IIntervalTypesDtc {
  IntervalType: string;
  Label: string;
  SmartIntervals: Array<{ Key: string }>;
}

export interface IIntervalDtc {
  IntervalType: string;
  IntervalString?: string;
  FullLabel?: string; // Not used.
  Label?: string; // Not used.
  offset: number;
  intervalStringDate?: string;
}

export interface ITypesAndInterval {
  intervalTypes: IIntervalTypesDtc[];
  interval?: IIntervalDtc;
}
