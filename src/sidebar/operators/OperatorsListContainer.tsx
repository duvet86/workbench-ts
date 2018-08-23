import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { OperatorsAction, operatorsRequest } from "sideBar/operators/actions";

import { IOperatorResult } from "sidebar/operators/types";

import { LoadingContainer } from "common/loading";
import OperatorsList from "sideBar/operators/OperatorsList";

interface IDispatchProps {
  dispatchLoadOperators: () => void;
}

interface IStateProps {
  isLoading: boolean;
  operators: { [key: string]: IOperatorResult };
  error: any;
}

type Props = IStateProps & IDispatchProps;

interface IStoreState {
  operatorsReducer: IStateProps;
}

class OperatorsListContainer extends Component<Props> {
  public componentDidMount() {
    this.props.dispatchLoadOperators();
  }

  public render() {
    const { isLoading, ...props } = this.props;

    return (
      <LoadingContainer isLoading={this.props.isLoading}>
        <OperatorsList {...props} />
      </LoadingContainer>
    );
  }
}

const mapStateToProps = ({
  operatorsReducer: { isLoading, operators, error }
}: IStoreState) => ({
  operators,
  isLoading,
  error
});

const mapDispatchToProps = (dispatch: Dispatch<OperatorsAction>) => ({
  dispatchLoadOperators: () => {
    dispatch(operatorsRequest());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OperatorsListContainer);
