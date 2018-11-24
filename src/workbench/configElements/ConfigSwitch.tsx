import React, { SFC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import { OperatorServiceIds } from "workbench/types";

import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";

import QueryConfigContainer from "workbench/query/config/QueryConfigContainer";

interface IProps extends WithStyles<typeof styles> {
  operatorServiceId: OperatorServiceIds;
  isDrawerOpen: boolean;
}

const styles = ({ spacing }: Theme) =>
  createStyles({
    paper: {
      width: "calc(100% - 362px)",
      marginTop: 48
    },
    form: {
      position: "relative",
      height: "100%",
      padding: spacing.unit * 2,
      overflow: "auto",
      marginBottom: 48
    }
  });

const drawerByType = (operatorServiceId: OperatorServiceIds) => {
  switch (operatorServiceId) {
    case OperatorServiceIds.QUERY:
      return <QueryConfigContainer />;
    case OperatorServiceIds.FILTER:
      return "TODO";
    default:
      return null;
  }
};

const ConfigSwitch: SFC<IProps> = ({
  classes,
  operatorServiceId,
  isDrawerOpen
}) => (
  <Drawer classes={{ paper: classes.paper }} anchor="right" open={isDrawerOpen}>
    {isDrawerOpen && (
      <form className={classes.form} noValidate autoComplete="off">
        <Grid container spacing={16} alignContent="stretch">
          {drawerByType(operatorServiceId)}
        </Grid>
      </form>
    )}
  </Drawer>
);

export default withStyles(styles)(ConfigSwitch);
