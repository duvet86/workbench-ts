import React from "react";
import Dialog from "@material-ui/core/Dialog";

import Calendar from "common/calendar/Calendar";
import DialogHeader from "common/calendar/DialogHeader";
import CalendarActions from "common/calendar/CalendarActions";

export interface IProps {
  isOpen: boolean;
  value: Date;
  min?: Date;
  max?: Date;
  okToConfirm?: boolean;
  onClose: (value: Date) => void;
  dateDisabled?: (date: Date) => boolean;
}

export interface IState {
  mode: "year" | "month";
  selectedValue: Date;
  month: number;
  year: number;
  yearIndex: number;
}

class CalendarContainer extends React.Component<IProps, IState> {
  private isMobile = window.innerWidth <= 500;

  constructor(props: IProps) {
    super(props);

    const now = new Date();
    let date = new Date(now.getTime());
    const { min, max } = props;
    if (max && now.getTime() > max.getTime()) {
      date = new Date(max.getTime());
    } else if (min && now.getTime() < min.getTime()) {
      date = new Date(min.getTime());
    }

    this.state = {
      mode: "month",
      selectedValue: props.value,
      month: date.getMonth(),
      year: date.getFullYear(),
      yearIndex: Math.floor(date.getFullYear() / 18)
    };
  }

  public render() {
    const { value, isOpen, dateDisabled, okToConfirm } = this.props;
    const { selectedValue, year, month, mode, yearIndex } = this.state;
    const active = okToConfirm ? selectedValue : value;
    const tabIndex = year * 12 + month;

    const selectCalendarYear = (currentYear?: number) => () =>
      this.selectCalendarYear(currentYear);

    return (
      <Dialog
        scroll="body"
        fullScreen={this.isMobile}
        open={isOpen}
        onClose={this.handleCancelClick}
        maxWidth="xs"
      >
        <DialogHeader value={selectedValue} />
        <Calendar
          isMobile={this.isMobile}
          mode={mode}
          previousMonthValid={this.previousMonthValid}
          nextMonthValid={this.nextMonthValid}
          previousMonth={this.previousMonth}
          nextMonth={this.nextMonth}
          monthIndexValid={this.monthIndexValid}
          tabIndex={tabIndex}
          active={active}
          dateDisabled={dateDisabled}
          selectDate={this.selectDate}
          showYearsCalendar={this.showYearsCalendar}
          setToday={this.setToday}
          onCancelClick={this.handleCancelClick}
          confirmDate={this.confirmDate}
          previousYearsValid={this.previousYearsValid}
          previousYears={this.previousYears}
          nextYearsValid={this.nextYearsValid}
          nextYears={this.nextYears}
          yearIndexValid={this.yearIndexValid}
          yearIndex={yearIndex}
          selectCalendarYear={selectCalendarYear}
          year={year}
          yearInvalid={this.yearInvalid}
        />
        <CalendarActions
          setToday={this.setToday}
          onCancelClick={this.handleCancelClick}
          confirmDate={this.confirmDate}
        />
      </Dialog>
    );
  }

  private setToday = () => {
    const now = new Date();
    this.setState({
      selectedValue: now,
      month: now.getMonth(),
      year: now.getFullYear(),
      yearIndex: Math.floor(now.getFullYear() / 18)
    });
  };

  private selectDate = (value: Date, _: React.MouseEvent<HTMLElement>) => {
    const { onClose, okToConfirm } = this.props;
    if (okToConfirm) {
      this.setState({ selectedValue: value });
    } else {
      onClose(value);
    }
  };

  private confirmDate = (_: React.MouseEvent<HTMLElement>) => {
    const { onClose } = this.props;
    onClose(this.state.selectedValue);
  };

  private handleCancelClick = (_: React.MouseEvent<HTMLElement>) => {
    const { onClose } = this.props;
    onClose(this.props.value);
  };

  private showYearsCalendar = () => {
    const { year } = this.state;
    this.setState({
      mode: "year",
      yearIndex: Math.floor(year / 18)
    });
  };

  private selectCalendarYear = (year?: number) => {
    const { min, max } = this.props;
    const { month } = this.state;
    if (year) {
      this.setState({
        mode: "month",
        year,
        month:
          min && month < min.getMonth() && year === min.getFullYear()
            ? min.getMonth()
            : max && month > max.getMonth() && year === max.getFullYear()
              ? max.getMonth()
              : month
      });
    } else {
      this.setState({
        mode: "month"
      });
    }
  };

  private previousYearsValid = () => {
    const { min } = this.props;
    const { yearIndex } = this.state;
    return (
      yearIndex >= 1 &&
      (min === undefined || yearIndex >= Math.ceil(min.getFullYear() / 18))
    );
  };

  private previousYears = () => {
    const { yearIndex } = this.state;
    this.setState({
      yearIndex: yearIndex - 1
    });
  };

  private nextYearsValid = () => {
    const { max } = this.props;
    const { yearIndex } = this.state;
    return max === undefined || yearIndex < Math.floor(max.getFullYear() / 18);
  };

  private nextYears = () => {
    const { yearIndex } = this.state;
    this.setState({
      yearIndex: yearIndex + 1
    });
  };

  private yearInvalid = (currentYear: number) => {
    const { min, max } = this.props;
    const { year } = this.state;
    return (
      (min && currentYear < min.getFullYear()) ||
      (max && currentYear > max.getFullYear()) ||
      year === currentYear
    );
  };

  private previousMonthValid = () => {
    const { min } = this.props;
    const { month, year } = this.state;
    return (
      min === undefined || (month > min.getMonth() || year > min.getFullYear())
    );
  };

  private previousMonth = () => {
    const { month, year } = this.state;
    this.setState({
      year: year - (month <= 0 ? 1 : 0),
      month: month <= 0 ? 11 : month - 1
    });
  };

  private nextMonthValid = () => {
    const { max } = this.props;
    const { month, year } = this.state;
    return (
      max === undefined || (month < max.getMonth() || year < max.getFullYear())
    );
  };

  private nextMonth = () => {
    const { month, year } = this.state;
    this.setState({
      year: year + (month >= 11 ? 1 : 0),
      month: month >= 11 ? 0 : month + 1
    });
  };

  private yearIndexValid = (index: number) => {
    const { yearIndex } = this.state;
    return index <= yearIndex + 2 && index >= yearIndex - 2;
  };

  private monthIndexValid = (index: number) => {
    const { month, year } = this.state;
    const currentIndex = year * 12 + month;
    return index <= currentIndex + 2 && index >= currentIndex - 2;
  };
}

export default CalendarContainer;
