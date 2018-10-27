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
import AllowedValuesSelect from "workbench/query/constraintSelector/AllowedValuesSelect";
import { IOption } from "common/select/SelectInputContainer";

interface IOwnProps {
  elementId: number;
  constraintId: number;
  dataType: string;
  availableFilter: IUdsFilterDescriptionDtc;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IOwnProps;

interface IState {
  isLoading: boolean;
  allowedValueOptions: Array<IOption<any>>;
}

class ConstraintSelectorContainer extends Component<Props, IState> {
  public state: IState = {
    isLoading: true,
    allowedValueOptions: []
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
      }
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
          )
        });
      } catch (e) {
        dispatchHandleException(e);
      }
    }
  }

  public render() {
    const { isLoading, allowedValueOptions } = this.state;

    return (
      <LoadingContainer isLoading={isLoading}>
        <AllowedValuesSelect
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
      dataType,
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
)(ConstraintSelectorContainer);
