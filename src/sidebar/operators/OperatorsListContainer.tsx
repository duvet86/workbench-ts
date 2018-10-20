import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import { OperatorsAction, operatorsRequest } from "sidebar/operators/actions";

import { LoadingContainer } from "common/loading";
import OperatorsList from "sidebar/operators/OperatorsList";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

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
  operatorsReducer: { isLoading, operators }
}: RootState) => ({
  operators,
  isLoading
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
