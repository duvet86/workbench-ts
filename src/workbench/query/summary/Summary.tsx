import React, { SFC } from "react";
import classnames from "classnames";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ColumnIcon from "@material-ui/icons/SettingsApplications";
import ConstraintIcon from "@material-ui/icons/FilterList";

const styles = (theme: Theme) =>
  createStyles({
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
      width: "15%"
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
  });

const columns = [
  "asd",
  "asd",
  "asd",
  "asaaa",
  "asdasdas",
  "asdwwrwe",
  "aaaaa",
  "sadsadasdsa"
];

const constrainsts = ["asd", "asd", "asd"];

let counter = 0;
function createData(name: string, calories: number, fat: number) {
  counter += 1;
  return { id: counter, name, calories, fat };
}

const rows = [
  createData("Cupcake", 305, 3.7),
  createData("Donut", 452, 25.0),
  createData("Eclair", 262, 16.0),
  createData("Frozen yoghurt", 159, 6.0),
  createData("Gingerbread", 356, 16.0),
  createData("Honeycomb", 408, 3.2),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Jelly Bean", 375, 0.0),
  createData("KitKat", 518, 26.0),
  createData("Lollipop", 392, 0.2),
  createData("Marshmallow", 318, 0),
  createData("Nougat", 360, 19.0),
  createData("Oreo", 437, 18.0)
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const page = 0;
const rowsPerPage = 5;

const Summary: SFC<WithStyles<typeof styles>> = ({ classes }) => (
  <>
    <Paper square elevation={1} className={classes.paper}>
      <Typography gutterBottom variant="h6" className={classes.labelContainer}>
        Query Label
      </Typography>
      <Typography variant="subtitle1">Cycle</Typography>
    </Paper>
    <Paper
      square
      elevation={1}
      className={classnames(classes.paper, classes.paperDivider)}
    >
      <Typography gutterBottom variant="h6" className={classes.labelContainer}>
        Source
      </Typography>
      <Typography variant="subtitle1">Cycle</Typography>
    </Paper>
    <ExpansionPanel>
      <ExpansionPanelSummary
        classes={{
          content: classes.expansionSummary
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant="h6" className={classes.labelContainer}>
          Columns (25)
        </Typography>
        <Typography variant="caption" className={classes.helper}>
          Click to view more...
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List dense className={classes.list}>
          <Divider />
          {columns.map((label, i) => (
            <ListItem key={i} divider>
              <ListItemIcon>
                <ColumnIcon />
              </ListItemIcon>
              <ListItemText primary={label} />
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
          Constraints (3)
        </Typography>
        <Typography variant="caption" className={classes.helper}>
          Click to view more...
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List dense className={classes.list}>
          <Divider />
          {constrainsts.map((label, i) => (
            <ListItem key={i} divider>
              <ListItemIcon>
                <ConstraintIcon />
              </ListItemIcon>
              <ListItemText primary={label} />
              <ListItemText primary={10} />
            </ListItem>
          ))}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    <div style={{ marginTop: 16 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell numeric>Qty.</TableCell>
            <TableCell numeric>@</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell numeric>{row.calories}</TableCell>
                  <TableCell numeric>{row.fat}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActionsWrapped}
            />
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  </>
);

export default withStyles(styles)(Summary);
