import React from "react";
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import CalendarHeader from "common/calendar/CalendarHeader";
import CalendarDays from "common/calendar/CalendarDays";
import CalendarYears from "common/calendar/CalendarYears";

import { months } from "common/calendar/utils";

export interface IProps extends WithStyles<typeof styles> {
  okToConfirm?: boolean;
  isMobile: boolean;
  mode: "year" | "month";
  tabIndex: number;
  active: Date;
  yearIndex: number;
  year: number;
  onCancelClick: (event: React.MouseEvent<HTMLElement>) => void;
  dateDisabled?: (date: Date) => boolean;
  previousMonthValid: () => boolean;
  nextMonthValid: () => boolean;
  previousMonth: () => void;
  nextMonth: () => void;
  monthIndexValid: (index: number) => boolean;
  selectDate: (date: Date, event: React.MouseEvent<HTMLElement>) => void;
  showYearsCalendar: () => void;
  setToday: () => void;
  confirmDate: (event: React.MouseEvent<HTMLElement>) => void;
  previousYearsValid: () => boolean;
  previousYears: () => void;
  nextYearsValid: () => boolean;
  nextYears: () => void;
  yearIndexValid: (index: number) => boolean;
  selectCalendarYear: (currentYear?: number | undefined) => () => void;
  yearInvalid: (currentYear: number) => boolean;
}

const styles = ({ spacing: { unit } }: Theme) =>
  createStyles({
    calendarContainer: {
      minHeight: 375,
      overflow: "hidden",
      padding: `0 ${unit}px ${unit}px`
    }
  });

const Calendar: React.SFC<IProps> = ({
  classes,
  isMobile,
  mode,
  previousMonthValid,
  nextMonthValid,
  previousMonth,
  nextMonth,
  monthIndexValid,
  tabIndex,
  active,
  dateDisabled,
  selectDate,
  showYearsCalendar,
  previousYearsValid,
  previousYears,
  nextYearsValid,
  nextYears,
  yearIndexValid,
  yearIndex,
  selectCalendarYear,
  year,
  yearInvalid
}) => (
  <div
    className={classes.calendarContainer}
    style={{ height: isMobile ? "100%" : undefined }}
  >
    {mode === "month" ? (
      <>
        <CalendarHeader
          previousValid={previousMonthValid}
          nextValid={nextMonthValid}
          previous={previousMonth}
          next={nextMonth}
          slideDirection="left"
          transKey={tabIndex.toString()}
        >
          <Button onClick={showYearsCalendar}>
            {`${months[tabIndex % 12].long}, ${Math.floor(tabIndex / 12)}`}
          </Button>
        </CalendarHeader>
        <div>
          {monthIndexValid(tabIndex) ? (
            <CalendarDays
              active={active}
              dateDisabled={dateDisabled}
              selectDate={selectDate}
              showYearsCalendar={showYearsCalendar}
              tabIndex={tabIndex}
              slideDirection="left"
            />
          ) : (
            <div key={tabIndex} />
          )}
        </div>
      </>
    ) : (
      <>
        <CalendarHeader
          previousValid={previousYearsValid}
          nextValid={nextYearsValid}
          previous={previousYears}
          next={nextYears}
          slideDirection="right"
          transKey={yearIndex.toString()}
        >
          <Button onClick={selectCalendarYear()}>
            {`${yearIndex * 18} - ${yearIndex * 18 + 17}`}
          </Button>
        </CalendarHeader>
        {yearIndexValid(yearIndex) ? (
          <CalendarYears
            selectCalendarYear={selectCalendarYear}
            yearIndex={yearIndex}
            year={year}
            yearInvalid={yearInvalid}
            slideDirection="right"
          />
        ) : (
          <div key={yearIndex} />
        )}
      </>
    )}
  </div>
);

export default withStyles(styles)(Calendar);
