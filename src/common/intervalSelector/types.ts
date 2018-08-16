export interface IIntervalTypesDtc {
  IntervalType: string;
  Label: string;
  SmartIntervals: Array<{ Key: string }>;
}

export interface IIntervalDtc {
  IntervalType: string;
  IntervalString: string;
  FullLabel: string;
  Label: string;
}

export interface IInterval {
  type: string;
  string?: string;
}
