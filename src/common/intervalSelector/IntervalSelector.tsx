import React, { SFC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";

import IntervalTypeSelectorContainer from "common/intervalSelector/IntervalTypeSelectorContainer";

const styles = ({ spacing: { unit } }: Theme) =>
  createStyles({
    container: {
      display: "flex"
    },
    dateSelector: {
      flexBasis: 350,
      margin: unit
    },
    intervalTypeSelector: {
      flexBasis: 200,
      margin: unit
    },
    smartSelector: {
      flexBasis: 200,
      margin: unit
    }
  });

const IntervalSelector: SFC<WithStyles<typeof styles>> = ({ classes }) => (
  <div className={classes.container}>
    <IntervalTypeSelectorContainer className={classes.intervalTypeSelector} />
    <FormControl className={classes.dateSelector}>
      <InputLabel htmlFor="name-input">Name</InputLabel>
      <Input
        type="date"
        id="name-input"
        startAdornment={
          <InputAdornment position="start">
            <IconButton aria-label="Toggle password visibility">
              {<ArrowLeft />}
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="Toggle password visibility">
              {<ArrowRight />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
    <FormControl className={classes.smartSelector}>
      <InputLabel htmlFor="age-simple">Smart Date</InputLabel>
      <Select value="" input={<Input name="age" id="age-simple" />} autoWidth>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  </div>
);

export default withStyles(styles)(IntervalSelector);
