import React, { SFC, ChangeEvent } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import { getIntervalTypes } from "common/intervalSelector/selector";
import { IIntervalTypesDtc, IIntervalDtc } from "common/intervalSelector/types";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import IntervalTypeSelector from "common/intervalSelector/IntervalTypeSelector";
import IntervalStringPickerContainer from "./IntervalStringPickerContainer";

interface IProps extends WithStyles<typeof styles> {
  intervalTypes: { [key: string]: IIntervalTypesDtc };
  initIntervalType: string;
  interval: IIntervalDtc;
  onIntervalTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onIntervalStringChange: (intervalString: string) => void;
  onSmartKeyChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onNextIntevalClick: (offset: number) => () => void;
}

const styles = ({ spacing: { unit } }: Theme) =>
  createStyles({
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
  });

const IntervalSelector: SFC<IProps> = ({
  classes,
  intervalTypes,
  initIntervalType,
  interval,
  onIntervalTypeChange,
  onIntervalStringChange,
  onNextIntevalClick,
  onSmartKeyChange
}) => {
  const smartIntervals = intervalTypes[initIntervalType].SmartIntervals;

  return (
    <div className={classes.container}>
      <IntervalTypeSelector
        options={getIntervalTypes(intervalTypes)}
        value={initIntervalType}
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

export default withStyles(styles)(IntervalSelector);
