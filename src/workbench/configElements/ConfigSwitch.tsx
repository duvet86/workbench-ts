import React, { FC, lazy } from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";

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

interface IProps {
  operatorServiceId: OperatorServiceIds;
  isDrawerOpen: boolean;
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
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
}));

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

const ConfigSwitch: FC<IProps> = ({ operatorServiceId, isDrawerOpen }) => {
  const classes = useStyles();

  return (
    <Drawer
      classes={{ paper: classes.paper }}
      anchor="right"
      open={isDrawerOpen}
    >
      {isDrawerOpen && (
        <form className={classes.form} noValidate autoComplete="off">
          <Grid container spacing={6} alignContent="stretch">
            {drawerByType(operatorServiceId)}
          </Grid>
        </form>
      )}
    </Drawer>
  );
};

export default ConfigSwitch;
