import React from "react";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";

import { IColumn } from "workbench/types";
import QueryNodeModel from "workbench/query/widget/QueryNodeModel";
import { operatorsExtraInfo } from "sidebar/operators/operatorsData";

import { makeStyles, Theme } from "@material-ui/core/styles";

import {
  FixedSizeList as VirtualizedList,
  ListChildComponentProps
} from "react-window";

import QueryColumn from "workbench/query/widget/QueryColumn";

import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

interface IProps {
  node: QueryNodeModel;
  engine: DiagramEngine;
}

const useStyles = makeStyles(
  ({
    palette: {
      background: { paper }
    }
  }: Theme) => ({
    operatorContainer: {
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
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
      padding: 0,
      width: 150,
      marginTop: 3,
      cursor: "default",
      "&:focus": {
        outline: 0
      }
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
      top: -9,
      backgroundColor: "#ccc",
      zIndex: -1
    },
    bottomPort: {
      position: "relative",
      top: 9,
      backgroundColor: "#ccc",
      borderRadius: 15,
      zIndex: -1
    }
  })
);

const rowRenderer = (columns: IColumn[]) => ({
  index,
  style
}: ListChildComponentProps) => (
  <QueryColumn style={style} label={columns[index].Label} />
);

const handleWheel = (event: React.WheelEvent) => {
  event.stopPropagation();
};

const QueryNodeWidget: React.FC<IProps> = ({ engine, node }) => {
  const classes = useStyles();

  const { Label: QueyLabel, Columns } = node.getQueryInfo();
  const { backgroundColor, IconComponent } = operatorsExtraInfo.QUERY;

  const portTo = node.getPort("to");
  const portFrom = node.getPort("from");
  if (portTo == null || portFrom == null) {
    return null;
  }

  return (
    <div className={classes.operatorContainer}>
      <div className={classes.topPort}>
        <PortWidget engine={engine} port={portTo} />
      </div>
      <div className={classes.titleContainer}>
        <Avatar className={classes.avatar} style={{ backgroundColor }}>
          {React.createElement(IconComponent)}
        </Avatar>
        <Typography variant="subtitle1" noWrap>
          {QueyLabel}
        </Typography>
      </div>
      <div>
        <Typography noWrap>Columns</Typography>
        <Divider />
        <List
          className={classes.list}
          onWheel={handleWheel}
          component={"div" as "ul"}
        >
          <VirtualizedList
            style={{
              outline: 0
            }}
            width="100%"
            height={Math.min(Columns.length * 20 + 2, 150)}
            itemCount={Columns.length}
            itemSize={20}
          >
            {rowRenderer(Columns)}
          </VirtualizedList>
        </List>
      </div>
      <div className={classes.bottomPort}>
        <PortWidget engine={engine} port={portFrom} />
      </div>
    </div>
  );
};

export default QueryNodeWidget;
