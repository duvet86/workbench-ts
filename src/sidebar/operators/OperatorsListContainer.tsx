import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { batchActions } from "redux-batched-actions";

import {
  ErrorActions,
  IErrorResponse,
  handleException
} from "errorPage/actions";
import { IOperatorServiceDtc } from "sidebar/operators/types";
import { getOperatorsAsync } from "sidebar/operators/api";

import { LoadingContainer } from "common/loading";
import OperatorsList from "sidebar/operators/OperatorsList";

type Props = ReturnType<typeof mapDispatchToProps>;

interface IState {
  isLoading: boolean;
  operators: IOperatorServiceDtc[];
}

class OperatorsListContainer extends Component<Props, IState> {
  public state: IState = {
    isLoading: true,
    operators: []
  };

  public async componentDidMount() {
    this.setState({
      isLoading: true
    });
    try {
      const operators = await getOperatorsAsync();
      this.setState({
        isLoading: false,
        operators
      });
    } catch (e) {
      this.props.dispatchHandleException(e);
    }
  }

  public render() {
    return (
      <LoadingContainer isLoading={this.state.isLoading}>
        <OperatorsList {...this.props} />
      </LoadingContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ErrorActions>) => ({
  dispatchHandleException: (resp: IErrorResponse) => {
    dispatch(batchActions(handleException(resp)));
  }
});

export default connect(
  undefined,
  mapDispatchToProps
)(OperatorsListContainer);
