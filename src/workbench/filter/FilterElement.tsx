import React, { SFC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import { operatorsExtraInfo } from "sidebar/operators/operatorsData";
import { ElementType } from "sidebar/operators/types";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

interface IProps extends WithStyles<typeof styles> {
  elementId: number;
  elementLabel: string;
  filterType: ElementType;
  x: number;
  y: number;
}

const styles = ({
  palette: {
    background: { paper }
  }
}: Theme) =>
  createStyles({
    operatorContainer: {
      position: "absolute",
      display: "flex",
      flexFlow: "column",
      padding: 5,
      cursor: "all-scroll",
      borderRadius: "0px 0px 80px 80px",
      border: "1px solid #2c5367",
      width: 130,
      height: 75,
      backgroundColor: paper
    },
    titleContainer: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 5
    },
    avatar: {
      marginRight: 10,
      width: 25,
      height: 25
    },
    filterType: {
      textAlign: "center"
    }
  });

const FilterElement: SFC<IProps> = ({
  classes,
  elementId,
  elementLabel,
  filterType,
  x,
  y
}) => (
  <div
    id={elementId.toString()}
    className={classes.operatorContainer}
    style={{ left: x, top: y }}
  >
    <div className={classes.titleContainer}>
      <Avatar
        className={classes.avatar}
        style={{ backgroundColor: operatorsExtraInfo[2].backgroundColor }}
      >
        {React.createElement(operatorsExtraInfo[2].IconComponent)}
      </Avatar>
      <Typography variant="subheading" noWrap>
        {elementLabel}
      </Typography>
    </div>
    <Typography className={classes.filterType} variant="body2" noWrap>
      {filterType}
    </Typography>
  </div>
);

export default withStyles(styles)(FilterElement);
