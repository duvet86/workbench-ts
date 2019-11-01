import React, { FC } from "react";
import classnames from "classnames";

import { makeStyles, Theme } from "@material-ui/core/styles";
import { IQuery } from "workbench/types";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ColumnIcon from "@material-ui/icons/SettingsApplications";
import ConstraintIcon from "@material-ui/icons/FilterList";

interface IProps {
  query: IQuery;
  querySourceLabel: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: "8px 24px 4px 24px"
  },
  paperDivider: {
    "&:before": {
      position: "absolute",
      left: 0,
      top: -1,
      right: 0,
      height: 1,
      content: "''",
      opacity: 1,
      backgroundColor: theme.palette.divider
    }
  },
  labelContainer: {
    flexShrink: 0,
    width: "25%"
  },
  list: {
    width: "100%",
    maxHeight: 300,
    overflow: "auto"
  },
  previewContainer: {
    padding: "10px 24px 8px 24px"
  },
  expansionSummary: {
    alignItems: "center"
  },
  helper: {
    color: "rgba(0, 0, 0, 0.54)"
  }
}));

const Summary: FC<IProps> = ({ query, querySourceLabel }) => {
  const classes = useStyles();

  return (
    <>
      <Paper square elevation={1} className={classes.paper}>
        <Typography
          gutterBottom
          variant="h6"
          className={classes.labelContainer}
        >
          Query Label
        </Typography>
        <Typography variant="subtitle1">{query.Label}</Typography>
      </Paper>
      <Paper
        square
        elevation={1}
        className={classnames(classes.paper, classes.paperDivider)}
      >
        <Typography
          gutterBottom
          variant="h6"
          className={classes.labelContainer}
        >
          Source
        </Typography>
        <Typography variant="subtitle1">{querySourceLabel}</Typography>
      </Paper>
      <ExpansionPanel>
        <ExpansionPanelSummary
          classes={{
            content: classes.expansionSummary
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography variant="h6" className={classes.labelContainer}>
            Columns ({query.Columns.length})
          </Typography>
          <Typography variant="caption" className={classes.helper}>
            Click to view more...
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List dense className={classes.list}>
            <Divider />
            {query.Columns.map(({ ColumnName, Label }) => (
              <ListItem key={ColumnName} divider>
                <ListItemIcon>
                  <ColumnIcon />
                </ListItemIcon>
                <ListItemText primary={Label} />
              </ListItem>
            ))}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          classes={{
            content: classes.expansionSummary
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography variant="h6" className={classes.labelContainer}>
            Constraints ({query.Constraints.length})
          </Typography>
          <Typography variant="caption" className={classes.helper}>
            Click to view more...
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List dense className={classes.list}>
            <Divider />
            {query.Constraints.map(({ ConstraintIndex, ConstraintName }) => (
              <ListItem key={ConstraintIndex} divider>
                <ListItemIcon>
                  <ConstraintIcon />
                </ListItemIcon>
                <ListItemText primary={ConstraintName} />
              </ListItem>
            ))}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};

export default Summary;
