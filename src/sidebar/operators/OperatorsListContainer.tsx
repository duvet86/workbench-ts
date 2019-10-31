import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import { OperatorsAction, operatorsRequest } from "sidebar/operators/actions";

import LoadingContainer from "common/loading/LoadingContainer";
import OperatorsList from "sidebar/operators/OperatorsList";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const OperatorsListContainer: FC<Props> = ({
  isLoading,
  dispatchLoadOperators,
  ...rest
}) => {
  useEffect(() => {
    dispatchLoadOperators();
  }, []);

  return (
    <LoadingContainer isLoading={isLoading}>
      <OperatorsList {...rest} />
    </LoadingContainer>
  );
};

const mapStateToProps = ({
  operators: { isLoading, operators },
  sessionGraph: { queries }
}: RootState) => ({
  operators,
  isLoading,
  areOperatorsEnabled: Object.keys(queries).length === 0
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
