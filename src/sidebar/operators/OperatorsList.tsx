import React, { SFC } from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import { IOperatorResult } from "sidebar/operators/types";

import List from "@material-ui/core/List";
import Operator from "sidebar/operators/Operator";

interface IProps extends WithStyles<typeof styles> {
  operators: { [key: string]: IOperatorResult };
  areOperatorsEnabled: boolean;
}

const styles = createStyles({
  list: {
    overflow: "auto"
  }
});

const OperatorsList: SFC<IProps> = ({
  classes,
  operators,
  areOperatorsEnabled
}) => (
  <List className={classes.list}>
    {Object.keys(operators).map(key => (
      <Operator
        key={key}
        {...operators[key]}
        areOperatorsEnabled={areOperatorsEnabled}
      />
    ))}
  </List>
);

export default withStyles(styles)(OperatorsList);
