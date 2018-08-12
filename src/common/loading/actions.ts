export const DELAY_START = "DELAY_START";
export type DELAY_START = typeof DELAY_START;

export const DELAY_END = "DELAY_END";
export type DELAY_END = typeof DELAY_END;

interface IStartDelay {
  type: DELAY_START;
}

interface IEndDelay {
  type: DELAY_END;
}

export type LoadingAction = IStartDelay | IEndDelay;

export const startDelay = (): IStartDelay => ({
  type: DELAY_START
});

export const endDelay = (): IEndDelay => ({
  type: DELAY_END
});
