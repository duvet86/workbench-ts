import React from "react";
import { PortWidget } from "storm-react-diagrams";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import QueryNodeModel from "workbench/query/canvas/QueryNodeModel";

import Typography from "@material-ui/core/Typography";

interface IProps extends WithStyles<typeof styles> {
  node: QueryNodeModel;
}

const styles = createStyles({
  container: {
    position: "relative",
    width: 100,
    height: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

const QueryNodeWidget: React.SFC<IProps> = ({ classes, node }) => (
  <div className={classes.container}>
    <div
      style={{
        position: "absolute",
        zIndex: 10,
        left: 100 / 2 - 8,
        top: -8
      }}
    >
      <PortWidget name="top" node={node} />
    </div>
    <div>
      <Typography variant="subheading" noWrap>
        Test
      </Typography>
    </div>
    <div
      style={{
        position: "absolute",
        zIndex: 10,
        left: 100 / 2 - 8,
        top: 100 - 8
      }}
    >
      <PortWidget name="bottom" node={node} />
    </div>
  </div>
);

export default withStyles(styles)(QueryNodeWidget);
