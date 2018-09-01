import React from "react";
import { PortWidget } from "storm-react-diagrams";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import QueryNodeModel from "workbench/query/canvas/QueryNodeModel";
import { operatorsExtraInfo } from "sidebar/operators/operatorsData";

import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import SettingsIcon from "@material-ui/icons/SettingsApplications";

interface IProps extends WithStyles<typeof styles> {
  node: QueryNodeModel;
}

const styles = ({
  palette: {
    background: { paper }
  }
}: Theme) =>
  createStyles({
    container: {
      // position: "relative",
      // width: 100,
      // height: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    operatorContainer: {
      // position: "absolute",
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
      // cursor: "all-scroll",
      borderRadius: 5,
      border: "1px solid #7b582d",
      padding: "0px 5px 0px 5px",
      width: 165,
      backgroundColor: paper
    },
    titleContainer: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      marginBottom: 5
    },
    avatar: {
      marginRight: 10,
      width: 25,
      height: 25
    },
    list: {
      overflow: "auto",
      maxHeight: 150,
      padding: 0,
      width: 150
    },
    listItem: {
      padding: 0
    },
    itemIcon: {
      width: 10,
      height: 10,
      marginRight: 5
    },
    primary: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    },
    topPort: {
      position: "relative",
      top: -8,
      backgroundColor: "#ccc"
    },
    bottomPort: {
      position: "relative",
      top: 8,
      backgroundColor: "#ccc"
    }
  });

const handleWheel = (event: React.WheelEvent) => {
  event.stopPropagation();
};

const QueryNodeWidget: React.SFC<IProps> = ({ classes, node }) => {
  const { Label: QueyLabel, Columns } = node.getQueryInfo();
  const { backgroundColor, IconComponent } = operatorsExtraInfo.QUERY;

  return (
    <div className={classes.container}>
      <div className={classes.operatorContainer}>
        <div className={classes.topPort}>
          <PortWidget name="top" node={node} />
        </div>
        <div className={classes.titleContainer}>
          <Avatar className={classes.avatar} style={{ backgroundColor }}>
            {React.createElement(IconComponent)}
          </Avatar>
          <Typography variant="subheading" noWrap>
            {QueyLabel}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" noWrap>
            Columns
          </Typography>
          <Divider />
          <List className={classes.list} onWheel={handleWheel}>
            {Columns.map(({ Label: ColumnLabel, ColumnName }) => (
              <ListItem key={ColumnName} className={classes.listItem} dense>
                <ListItemIcon className={classes.itemIcon}>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.listItem}
                  classes={{ primary: classes.primary }}
                  primary={ColumnLabel}
                />
              </ListItem>
            ))}
          </List>
        </div>
        <div className={classes.bottomPort}>
          <PortWidget name="bottom" node={node} />
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(QueryNodeWidget);
