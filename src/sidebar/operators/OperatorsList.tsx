import React, { SFC } from "react";

import List from "@material-ui/core/List";

import { IOperatorResult } from "sideBar/operators/types";

import Operator from "sideBar/operators/Operator";

interface IProps {
  operators: { [key: string]: IOperatorResult };
}

const OperatorsList: SFC<IProps> = ({ operators }) => (
  <List>
    {Object.keys(operators).map(key => (
      <Operator key={key} {...operators[key]} />
    ))}
  </List>
);

export default OperatorsList;
