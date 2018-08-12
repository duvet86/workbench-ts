import PropTypes from "prop-types";
import React, { SFC } from "react";

import { IOperatorResult } from "sideBar/operators/actions";

import List from "@material-ui/core/List";

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

OperatorsList.propTypes = {
  operators: PropTypes.object
};

export default OperatorsList;
