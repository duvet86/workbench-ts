import React, { Component } from "react";

import DateOp from "common/intervalSelector/intervalString/DateOp";

interface IProps {
  className: string;
  intervalStringDate: string;
  handleNextIntevalClick: (offset: number) => () => void;
}

interface IState {
  isOpen: boolean;
}

class DateOpContainer extends Component<IProps, IState> {
  public state: IState = {
    isOpen: false
  };

  public render() {
    const {
      className,
      intervalStringDate,
      handleNextIntevalClick
    } = this.props;

    return (
      <DateOp
        className={className}
        intervalStringDate={intervalStringDate}
        handleNextIntevalClick={handleNextIntevalClick}
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
    // tslint:disable-next-line:no-console
    console.log(value);
    this.setState({ isOpen: false });
  };
}

export default DateOpContainer;
