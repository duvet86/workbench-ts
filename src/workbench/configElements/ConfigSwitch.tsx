import React, { SFC, lazy } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import { OperatorServiceIds } from "workbench/types";

import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import LoadAsync from "common/loading/LoadAsync";

const QueryConfigContainerLazy = lazy(() =>
  import("workbench/query/config/QueryConfigContainer")
);
const FilterConfigContainerLazy = lazy(() =>
  import("workbench/filter/config/FilterConfigContainer")
);

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
      padding: spacing() * 2,
      overflow: "auto",
      marginBottom: 48
    }
  });

const drawerByType = (operatorServiceId: OperatorServiceIds) => {
  let component;
  switch (operatorServiceId) {
    case OperatorServiceIds.QUERY:
      component = <QueryConfigContainerLazy />;
      break;
    case OperatorServiceIds.FILTER:
      component = <FilterConfigContainerLazy />;
      break;
    default:
      return null;
  }

  return <LoadAsync>{component}</LoadAsync>;
};

const ConfigSwitch: SFC<IProps> = ({
  classes,
  operatorServiceId,
  isDrawerOpen
}) => (
  <Drawer classes={{ paper: classes.paper }} anchor="right" open={isDrawerOpen}>
    {isDrawerOpen && (
      <form className={classes.form} noValidate autoComplete="off">
        <Grid container spacing={6} alignContent="stretch">
          {drawerByType(operatorServiceId)}
        </Grid>
      </form>
    )}
  </Drawer>
);

export default withStyles(styles)(ConfigSwitch);
