import React, { Component } from "react";

import { parseDateOpDate } from "common/intervalSelector/utils";

import DateOp from "common/intervalSelector/intervalString/DateOp";

interface IProps {
  className: string;
  intervalStringDate: string;
  onIntervalStringChange: (intervalString: string) => void;
  onNextIntevalClick: (offset: number) => () => void;
}

interface IState {
  isOpen: boolean;
}

class DateOpContainer extends Component<IProps, IState> {
  public state: IState = {
    isOpen: false
  };

  public render() {
    const { className, intervalStringDate, onNextIntevalClick } = this.props;

    return (
      <DateOp
        className={className}
        intervalStringDate={intervalStringDate}
        onNextIntevalClick={onNextIntevalClick}
        isOpen={this.state.isOpen}
        onOpen={this.handleClickOpen}
        onClose={this.handleClose}
      />
    );
  }

  private handleClickOpen = () => {
    this.setState({
      isOpen: true
    });
  };

  private handleClose = (value: Date) => {
    this.props.onIntervalStringChange(parseDateOpDate(value));
    this.setState({ isOpen: false });
  };
}

export default DateOpContainer;
