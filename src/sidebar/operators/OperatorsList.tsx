import React, { FC } from "react";

import { styled } from "@material-ui/core/styles";
import { IOperatorResult } from "sidebar/operators/types";

import List from "@material-ui/core/List";
import Operator from "sidebar/operators/Operator";

interface IProps {
  operators: { [key: string]: IOperatorResult };
  areOperatorsEnabled: boolean;
}

const StyledList = styled(List)({
  overflow: "auto"
});

const OperatorsList: FC<IProps> = ({ operators, areOperatorsEnabled }) => (
  <StyledList>
    {Object.keys(operators).map(key => (
      <Operator
        key={key}
        {...operators[key]}
        areOperatorsEnabled={areOperatorsEnabled}
      />
    ))}
  </StyledList>
);

export default OperatorsList;
