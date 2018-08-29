import grid20 from "workbench/canvas/grid20.png";

import React, { SFC } from "react";
import { jsPlumbInstance as jsInst } from "jsplumb";

import { IQuery, IInteractiveFilter, IConnection } from "workbench/types";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import ElementContainer from "workbench/canvas/ElementContainer";

interface IProps extends WithStyles<typeof styles> {
  containerId: string;
  jsPlumbInstance: jsInst;
  moveOperatorInCanvas: (
    type: string,
    index: number,
    x: number,
    y: number
  ) => void;
  queries: IQuery[];
  filters: IInteractiveFilter[];
  connections: IConnection[];
}

const styles = createStyles({
  container: {
    height: "100%",
    width: "100%"
  },
  item: {
    transformOrigin: "0px 0px 0px",
    backgroundImage: `url(${grid20})`
  }
});

const Canvas: SFC<IProps> = ({
  classes,
  containerId,
  jsPlumbInstance,
  moveOperatorInCanvas,
  queries,
  filters,
  connections
}) => (
  <Grid id={containerId} container className={classes.container}>
    <Grid item xs={12} className={classes.item}>
      {queries &&
        queries.map(
          ({ ElementId, Label, LayoutX, LayoutY, Columns }, index) => (
            <ElementContainer
              key={ElementId}
              // jsPlumbInstance={jsPlumbInstance}
              // moveOperatorInCanvas={moveOperatorInCanvas}
              index={index}
              type="QUERY"
              connections={connections}
              elementId={ElementId}
              elementLabel={Label}
              columns={Columns}
              x={LayoutX}
              y={LayoutY}
            />
          )
        )}
      {filters &&
        filters.map(
          ({ ElementId, FilterType, Label, LayoutX, LayoutY }, index) => (
            <ElementContainer
              key={ElementId}
              // jsPlumbInstance={jsPlumbInstance}
              // moveOperatorInCanvas={moveOperatorInCanvas}
              index={index}
              type="FILTER"
              connections={connections}
              elementId={ElementId}
              elementLabel={Label}
              x={LayoutX}
              y={LayoutY}
            />
          )
        )}
    </Grid>
  </Grid>
);

export default withStyles(styles)(Canvas);
