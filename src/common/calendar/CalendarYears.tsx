import React from "react";
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import SlideTransition from "common/calendar/SlideTransition";

import { generateYearCalendar } from "common/calendar/utils";

export interface IProps extends WithStyles<typeof styles> {
  selectCalendarYear: (year?: number | undefined) => () => void;
  yearIndex: number;
  year: number;
  yearInvalid: (currentYear: number) => boolean;
  slideDirection: "left" | "right";
}

const styles = (theme: Theme) =>
  createStyles({
    years: {
      height: 48,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center"
    },
    invalidInput: {
      color: theme.palette.text.disabled
    }
  });

const CalendarYears: React.SFC<IProps> = ({
  classes,
  selectCalendarYear,
  yearIndex,
  year,
  yearInvalid,
  slideDirection
}) => (
  <SlideTransition
    slideDirection={slideDirection}
    transKey={yearIndex.toString()}
  >
    <div>
      {generateYearCalendar(yearIndex).map((years, index) => (
        <div className={classes.years} key={"years-" + index}>
          {years.map((currentYear, yi) => (
            <Button
              variant={year === currentYear ? "contained" : "text"}
              disabled={yearInvalid(currentYear)}
              onClick={selectCalendarYear(currentYear)}
              key={"year-" + yi}
            >
              <Typography
                className={
                  yearInvalid(currentYear) ? classes.invalidInput : undefined
                }
                variant="body1"
              >
                {currentYear}
              </Typography>
            </Button>
          ))}
        </div>
      ))}
    </div>
  </SlideTransition>
);

export default withStyles(styles)(CalendarYears);
