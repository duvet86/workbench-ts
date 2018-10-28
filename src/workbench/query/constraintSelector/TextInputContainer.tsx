import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Observable, Subscriber } from "rxjs";
import { debounceTime, share } from "rxjs/operators";

import {
  updateQueryConstraintValues,
  IUpdateQueryConstraintValues
} from "workbench/actions";

import TextInput from "workbench/query/constraintSelector/TextInput";

interface IOwnProps {
  elementId: number;
  constraintId: number;
  inputType: string;
  initDisplayValue: string;
}

type Props = ReturnType<typeof mapDispatchToProps> & IOwnProps;

interface IState {
  displayValue: string;
}

class TextInputContainer extends Component<Props, IState> {
  private inputChange$: Observable<string>;
  private handleInputChange!: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;

  constructor(props: Props) {
    super(props);

    this.inputChange$ = Observable.create((observer: Subscriber<string>) => {
      this.handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        observer.next(event.target.value);
      };
    }).pipe(share());

    // The display value changes synchoniously.
    this.inputChange$.subscribe(eventValue => {
      this.setState({
        displayValue: eventValue
      });
    });

    // The real constraint value gets applied after a debounce.
    this.inputChange$.pipe(debounceTime(300)).subscribe(eventValue => {
      this.applyConstraintValue(eventValue);
    });

    this.state = {
      displayValue: this.props.initDisplayValue
    };
  }

  public render() {
    return (
      <TextInput
        inputType={this.props.inputType}
        displayValue={this.state.displayValue}
        handledUpdateQueryConstraintValues={this.handleInputChange}
      />
    );
  }

  private applyConstraintValue = (eventValue: string) => {
    const {
      elementId,
      constraintId,
      dispatchUpdateQueryConstraintValues
    } = this.props;

    const vectorValues = [[eventValue]];
    dispatchUpdateQueryConstraintValues(elementId, constraintId, vectorValues);
  };
}

const mapDispatchToProps = (
  dispatch: Dispatch<IUpdateQueryConstraintValues>
) => ({
  dispatchUpdateQueryConstraintValues: (
    elementId: number,
    constraintId: number,
    constraintValues: string[][]
  ) =>
    dispatch(
      updateQueryConstraintValues(elementId, constraintId, constraintValues)
    )
});

export default connect(
  undefined,
  mapDispatchToProps
)(TextInputContainer);
