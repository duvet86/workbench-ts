import React from "react";
import { PortWidget } from "diagram/main";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import FilterNodeModel from "workbench/filter/widget/FilterNodeModel";
import { operatorsExtraInfo } from "sidebar/operators/operatorsData";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

interface IProps extends WithStyles<typeof styles> {
  node: FilterNodeModel;
}

const styles = ({
  palette: {
    background: { paper }
  }
}: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "0px 0px 80px 80px",
      border: "1px solid #2c5367",
      width: 155,
      height: 85,
      backgroundColor: paper
    },
    body: {
      display: "flex",
      maxWidth: 130,
      marginBottom: 5
    },
    avatar: {
      width: 25,
      height: 25,
      marginRight: 3
    },
    label: {
      marginTop: 10
    },
    filterType: {
      textAlign: "center"
    },
    topPort: {
      position: "relative",
      top: -11,
      backgroundColor: "#ccc",
      zIndex: -1
    },
    bottomPort: {
      position: "relative",
      top: 11,
      backgroundColor: "#ccc",
      borderRadius: 15,
      zIndex: -1
    }
  });

const FilterNodeWidget: React.SFC<IProps> = ({ classes, node }) => {
  const { Label, FilterType } = node.getFilterInfo();
  const { backgroundColor, IconComponent } = operatorsExtraInfo.FILTER;

  return (
    <div className={classes.container}>
      <div className={classes.topPort}>
        <PortWidget name="to" node={node} />
      </div>
      <div className={classes.body}>
        <Avatar className={classes.avatar} style={{ backgroundColor }}>
          {React.createElement(IconComponent)}
        </Avatar>
        <Typography variant="subtitle1" noWrap>
          {Label}
        </Typography>
      </div>
      <Typography className={classes.filterType} noWrap>
        {FilterType}
      </Typography>
      <div className={classes.bottomPort}>
        <PortWidget name="from" node={node} />
      </div>
    </div>
  );
};

export default withStyles(styles)(FilterNodeWidget);
