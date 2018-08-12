import PropTypes from "prop-types";
import React, { Fragment, SFC } from "react";
import { NavLink } from "react-router-dom";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Dashboard from "@material-ui/icons/Dashboard";

interface IProps extends WithStyles<typeof styles> {
  ItemId: string;
  Label: string;
  nested?: boolean;
}

const styles = ({ typography }: Theme) =>
  createStyles({
    listItemOpen: {
      paddingLeft: 30
    },
    icon: {
      color: "#696969"
    },
    heading: {
      fontSize: typography.pxToRem(15),
      fontWeight: typography.fontWeightRegular
    }
  });

const workbenchLink = (itemId: string) => () => (
  <NavLink to={`/workbench/${itemId}`} />
);

const Item: SFC<IProps> = ({ classes, ItemId, Label, nested }) => (
  <Fragment>
    <ListItem
      component={workbenchLink(ItemId)}
      className={nested ? classes.listItemOpen : undefined}
    >
      <Dashboard className={classes.icon} />
      <ListItemText
        primary={Label}
        classes={{
          primary: classes.heading
        }}
      />
    </ListItem>
    <Divider />
  </Fragment>
);

Item.propTypes = {
  classes: PropTypes.object.isRequired,
  ItemId: PropTypes.string.isRequired,
  Label: PropTypes.string.isRequired,
  nested: PropTypes.bool
};

export default withStyles(styles)(Item);
