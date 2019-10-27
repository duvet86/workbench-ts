import React, { SFC } from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import { IOption } from "common/select/SelectInputContainer";
import SearchableListContainer from "common/searchableList/SearchableListContainer";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import ArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import ArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

interface IProps extends WithStyles<typeof styles> {
  availableColumns: IOption[];
  selectedColumns: IOption[];
  handleAddQueryColumn: (column: IOption) => (event: React.MouseEvent) => void;
  handleRemoveQueryColumn: (
    column: IOption
  ) => (event: React.MouseEvent) => void;
}

const styles = ({ spacing }: Theme) =>
  createStyles({
    listContainer: {
      position: "relative"
    },
    button: {
      position: "absolute",
      right: spacing() * 2,
      top: spacing() * 2
    }
  });

const ColumnsSelector: SFC<IProps> = ({
  classes,
  availableColumns,
  selectedColumns,
  handleAddQueryColumn,
  handleRemoveQueryColumn
}) => (
  <Grid container spacing={6}>
    <Grid item xs={6} className={classes.listContainer}>
      {availableColumns.length > 0 && (
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          className={classes.button}
        >
          Add All Columns
          <ArrowRightIcon />
        </Button>
      )}
      <SearchableListContainer
        label="Available Columns"
        items={availableColumns}
        handleItemClick={handleAddQueryColumn}
      />
    </Grid>
    <Grid item xs={6} className={classes.listContainer}>
      {selectedColumns.length > 0 && (
        <Button variant="outlined" size="small" className={classes.button}>
          <ArrowLeftIcon />
          Remove All Columns
        </Button>
      )}
      <SearchableListContainer
        label="Selected Columns"
        emptyListLabel="Seleact a Column"
        items={selectedColumns}
        handleItemClick={handleRemoveQueryColumn}
      />
    </Grid>
  </Grid>
);

export default withStyles(styles)(ColumnsSelector);
