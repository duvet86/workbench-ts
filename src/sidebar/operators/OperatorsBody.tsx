import React, { SFC } from "react";

import { IOperatorResult } from "sidebar/operators/types";

import OperatorsList from "sidebar/operators/OperatorsList";

interface IProps {
  operators?: { [key: string]: IOperatorResult };
}

const OperatorsBody: SFC<IProps> = ({ operators }) => (
    <OperatorsList {...props} />
);

export default OperatorsBody;
