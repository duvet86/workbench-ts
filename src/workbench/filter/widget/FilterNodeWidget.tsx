import React from "react";
import { PortWidget } from "storm-react-diagrams2";

import { makeStyles, Theme } from "@material-ui/core/styles";

import FilterNodeModel from "workbench/filter/widget/FilterNodeModel";
import { operatorsExtraInfo } from "sidebar/operators/operatorsData";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

interface IProps {
  node: FilterNodeModel;
}

const useStyles = makeStyles(
  ({
    spacing,
    palette: {
      background: { paper }
    }
  }: Theme) => ({
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
      width: "100%",
      marginBottom: 5,
      alignItems: "center",
      justifyContent: "center"
    },
    avatar: {
      width: 25,
      height: 25,
      marginRight: spacing()
    },
    filterType: {
      textAlign: "center",
      fontStyle: "italic"
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
  })
);

const FilterNodeWidget: React.FC<IProps> = ({ node }) => {
  const classes = useStyles();
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

export default FilterNodeWidget;
