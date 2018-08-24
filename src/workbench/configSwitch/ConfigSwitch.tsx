import React, { SFC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import { ElementType } from "sidebar/operators/types";

import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";

import QueryConfigContainer from "workbench/query/QueryConfigContainer";

interface IProps extends WithStyles<typeof styles> {
  elementType: ElementType;
  isDrawerOpen: boolean;
}

const styles = ({ spacing }: Theme) =>
  createStyles({
    paper: {
      width: "85%",
      marginTop: 48
    },
    form: {
      position: "relative",
      height: "100%",
      padding: spacing.unit,
      overflow: "auto",
      marginBottom: 48
    }
  });

const drawerByType = (elementType: ElementType) => {
  switch (elementType) {
    case ElementType.QUERY:
      return <QueryConfigContainer />;
    case ElementType.FILTER:
      return "FILTER";
    default:
      return null;
  }
};

const ConfigSwitch: SFC<IProps> = ({ classes, elementType, isDrawerOpen }) => (
  <Drawer classes={{ paper: classes.paper }} anchor="right" open={isDrawerOpen}>
    {isDrawerOpen && (
      <form className={classes.form} noValidate autoComplete="off">
        <Grid container spacing={16} alignContent="stretch">
          {drawerByType(elementType)}
        </Grid>
      </form>
    )}
  </Drawer>
);

export default withStyles(styles)(ConfigSwitch);
