import grid20 from "workbench/canvas/grid20.png";

import React, { SFC } from "react";
import PropTypes from "prop-types";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import ElementContainer from "workbench/canvas/ElementContainer";

interface IProps extends WithStyles<typeof styles> {
  containerId: string;
  jsPlumbInstance: any;
  moveOperatorInCanvas: () => void;
  queries: any[];
  filters: any[];
  connections: any[];
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
        queries.map((query, index) => (
          <ElementContainer
            key={query.elementId}
            jsPlumbInstance={jsPlumbInstance}
            moveOperatorInCanvas={moveOperatorInCanvas}
            index={index}
            connections={connections}
            {...query}
          />
        ))}
      {filters &&
        filters.map((filter, index) => (
          <ElementContainer
            key={filter.elementId}
            jsPlumbInstance={jsPlumbInstance}
            moveOperatorInCanvas={moveOperatorInCanvas}
            index={index}
            connections={connections}
            {...filter}
          />
        ))}
    </Grid>
  </Grid>
);

Canvas.propTypes = {
  classes: PropTypes.object.isRequired,
  containerId: PropTypes.string.isRequired,
  jsPlumbInstance: PropTypes.object.isRequired,
  moveOperatorInCanvas: PropTypes.func.isRequired
};

export default withStyles(styles)(Canvas);
