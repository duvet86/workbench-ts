import React from "react";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";

import { makeStyles, Theme } from "@material-ui/core/styles";

import FilterNodeModel from "workbench/filter/widget/FilterNodeModel";
import { operatorsExtraInfo } from "sidebar/operators/operatorsData";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

interface IProps {
  node: FilterNodeModel;
  engine: DiagramEngine;
}

const useStyles = makeStyles(
  ({
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
  })
);

const FilterNodeWidget: React.FC<IProps> = ({ node, engine }) => {
  const classes = useStyles();

  const { Label, FilterType } = node.getFilterInfo();
  const { backgroundColor, IconComponent } = operatorsExtraInfo.FILTER;

  const portTo = node.getPort("to");
  const portFrom = node.getPort("from");
  if (portTo == null || portFrom == null) {
    return null;
  }

  return (
    <div className={classes.container}>
      <div className={classes.topPort}>
        <PortWidget engine={engine} port={portTo} />
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
        <PortWidget engine={engine} port={portFrom} />
      </div>
    </div>
  );
};

export default FilterNodeWidget;
