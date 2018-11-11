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
} from "common/errorBoundary/actions";
import {
  updateQueryConstraintValues,
  IUpdateQueryConstraintValues
} from "workbench/actions";

import LoadingContainer from "common/loading/LoadingContainer";
import AllowedValues from "workbench/query/constraintSelector/AllowedValues";
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
  allowedValueOptions: IOption[];
  selectedValues: string[];
}

class AllowedValuesContainer extends Component<Props, IState> {
  public state: IState = {
    isLoading: false,
    allowedValueOptions: [],
    selectedValues: []
  };

  public async componentDidMount() {
    const {
      dispatchHandleException,
      session,
      availableFilter: {
        AllowedValuesSessionId,
        AllowedValuesQueryGraphId,
        FilterName
      },
      initDisplayValue
    } = this.props;
    if (session == null) {
      throw new Error("Session cannot be null.");
    }

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

      let selectedValues: string[];
      if (initDisplayValue == null) {
        const allSelected = allowedValues.find(({ Selected }) => !Selected);

        selectedValues =
          allSelected == null
            ? allowedValues.map(({ ValueVector }) => ValueVector[0] as string)
            : allowedValues
                .filter(({ Selected }) => Selected)
                .map(({ ValueVector }) => ValueVector[0] as string);
      } else {
        selectedValues = initDisplayValue;
      }

      this.setState({
        isLoading: false,
        allowedValueOptions: allowedValues.map<IOption>(
          ({ DisplayValue, ValueVector }) => ({
            label: DisplayValue,
            value: ValueVector[0]
          })
        ),
        selectedValues
      });
    } catch (e) {
      dispatchHandleException(e);
    }
  }

  public render() {
    const { isLoading, allowedValueOptions, selectedValues } = this.state;

    return (
      <LoadingContainer isLoading={isLoading}>
        <AllowedValues
          selectedValues={selectedValues}
          allowedValueOptions={allowedValueOptions}
          handledUpdateQueryConstraintValues={
            this.handledUpdateQueryConstraintValues
          }
        />
      </LoadingContainer>
    );
  }

  private handledUpdateQueryConstraintValues = (
    selectedOptions?: IOption[]
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
)(AllowedValuesContainer);
