export interface IIntervalTypes {
  IntervalType: string;
  Label: string;
  SmartIntervals: Array<{ Key: string }>;
}

export interface IInterval {
  type: string;
  string?: string;
}
