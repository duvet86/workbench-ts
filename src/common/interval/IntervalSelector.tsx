import React, { FC, ChangeEvent } from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";

import { getIntervalTypes } from "common/interval/selector";
import { IIntervalTypesDtc, IIntervalDtc } from "common/interval/types";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import IntervalTypeSelector from "common/interval/IntervalTypeSelector";
import IntervalStringPickerContainer from "./IntervalStringPickerContainer";

interface IProps {
  intervalTypes: { [key: string]: IIntervalTypesDtc };
  // initIntervalType: string;
  interval: IIntervalDtc;
  onIntervalTypeChange: (
    event: ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  onIntervalStringChange: (intervalString: string) => void;
  onSmartKeyChange: (
    event: ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  onNextIntevalClick: (offset: number) => () => Promise<void>;
}

const useStyles = makeStyles(({ spacing }: Theme) => {
  const unit = spacing();

  return {
    container: {
      display: "flex",
      width: "100%"
    },
    smartSelector: {
      flexGrow: 1,
      margin: unit
    },
    stringPickerContainer: {
      flexGrow: 2,
      margin: `${unit * 3}px ${unit}px ${unit}px ${unit}px`
    }
  };
});

const IntervalSelector: FC<IProps> = ({
  intervalTypes,
  interval,
  onIntervalTypeChange,
  onIntervalStringChange,
  onNextIntevalClick,
  onSmartKeyChange
}) => {
  const classes = useStyles();
  const smartIntervals = intervalTypes[interval.IntervalType].SmartIntervals;

  return (
    <div className={classes.container}>
      <IntervalTypeSelector
        options={getIntervalTypes(intervalTypes)}
        value={interval.IntervalType}
        onChange={onIntervalTypeChange}
      />
      <IntervalStringPickerContainer
        className={classes.stringPickerContainer}
        interval={interval}
        onIntervalStringChange={onIntervalStringChange}
        onNextIntevalClick={onNextIntevalClick}
      />
      {smartIntervals.length > 0 && (
        <FormControl className={classes.smartSelector}>
          <InputLabel htmlFor="smartInterval">Smart Date</InputLabel>
          <Select
            value={interval.smartIntervalKey || ""}
            onChange={onSmartKeyChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {smartIntervals.map(({ Key }) => (
              <MenuItem key={Key} value={Key}>
                {Key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};

export default IntervalSelector;
