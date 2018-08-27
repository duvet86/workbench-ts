import React, { SFC } from "react";

import List from "@material-ui/core/List";

import { IOperatorResult } from "sidebar/operators/types";

import Operator from "sidebar/operators/Operator";

interface IProps {
  operators?: { [key: string]: IOperatorResult };
}

const OperatorsList: SFC<IProps> = ({ operators }) => (
  <List>
    {operators &&
      Object.keys(operators).map(key => (
        <Operator key={key} {...operators[key]} />
      ))}
  </List>
);

export default OperatorsList;
