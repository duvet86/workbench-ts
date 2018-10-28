import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { batchActions } from "redux-batched-actions";
import { RootState } from "rootReducer";

import { getAllowedValuesAsync } from "workbench/query/api";
import { IUdsFilterDescriptionDtc } from "workbench/query/types";
import {
  ErrorActions,
  IErrorResponse,
  handleException
} from "errorPage/actions";
import {
  updateQueryConstraintValues,
  IUpdateQueryConstraintValues
} from "workbench/actions";

import { LoadingContainer } from "common/loading";
import ListInput from "workbench/query/constraintSelector/ListInput";
import { IOption } from "common/select/SelectInputContainer";

interface IOwnProps {
  elementId: number;
  constraintId: number;
  availableFilter: IUdsFilterDescriptionDtc;
  initDisplayValue?: string[];
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IOwnProps;

interface IState {
  isLoading: boolean;
  allowedValueOptions: Array<IOption<any>>;
  displayValue: string[];
}

class ListInputContainer extends Component<Props, IState> {
  public state: IState = {
    isLoading: false,
    allowedValueOptions: [],
    displayValue: []
  };

  public async componentDidMount() {
    const {
      dispatchHandleException,
      session,
      availableFilter: {
        HasAllowedValues,
        AllowedValuesSessionId,
        AllowedValuesQueryGraphId,
        FilterName
      },
      initDisplayValue
    } = this.props;
    if (session == null) {
      throw new Error("Session cannot be null.");
    }

    if (HasAllowedValues) {
      this.setState({
        isLoading: true
      });

      try {
        const allowedValues = await getAllowedValuesAsync(
          session.TenantId,
          AllowedValuesSessionId,
          AllowedValuesQueryGraphId,
          FilterName
        );

        this.setState({
          isLoading: false,
          allowedValueOptions: allowedValues.map<IOption>(
            ({ DisplayValue, ValueVector }) => ({
              label: DisplayValue,
              value: ValueVector
            })
          ),
          displayValue: allowedValues
            .filter(({ Selected }) => Selected)
            .map(({ DisplayValue }) => DisplayValue)
        });
      } catch (e) {
        dispatchHandleException(e);
      }
    } else if (initDisplayValue != null) {
      this.setState({
        displayValue: initDisplayValue
      });
    }
  }

  public render() {
    const { isLoading, allowedValueOptions, displayValue } = this.state;

    return (
      <LoadingContainer isLoading={isLoading}>
        <ListInput
          displayValue={displayValue}
          allowedValueOptions={allowedValueOptions}
          handledUpdateQueryConstraintValues={
            this.handledUpdateQueryConstraintValues
          }
        />
      </LoadingContainer>
    );
  }

  private handledUpdateQueryConstraintValues = (
    event: React.ChangeEvent<HTMLSelectElement>,
    child: React.ReactNode
  ) => {
    const {
      elementId,
      constraintId,
      dispatchUpdateQueryConstraintValues
    } = this.props;

    // TODO: convert value to vector value.

    // dispatchUpdateQueryConstraintValues(
    //   elementId,
    //   constraintId,
    //   valuesObj.vectorValues
    // );
  };
}

const mapStateToProps = ({ sessionReducer: { session } }: RootState) => ({
  session
});

const mapDispatchToProps = (
  dispatch: Dispatch<ErrorActions | IUpdateQueryConstraintValues>
) => ({
  dispatchHandleException: (resp: IErrorResponse) => {
    dispatch(batchActions(handleException(resp)));
  },
  dispatchUpdateQueryConstraintValues: (
    elementId: number,
    constraintId: number,
    constraintValues: any[]
  ) =>
    dispatch(
      updateQueryConstraintValues(elementId, constraintId, constraintValues)
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListInputContainer);
