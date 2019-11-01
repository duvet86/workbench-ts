import React, { FC } from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";

import { IOption } from "common/select/SelectInputContainer";
import SearchableListContainer from "common/searchableList/SearchableListContainer";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import ArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import ArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

interface IProps {
  availableColumns: IOption[];
  selectedColumns: IOption[];
  handleAddQueryColumn: (column: IOption) => (event: React.MouseEvent) => void;
  handleRemoveQueryColumn: (
    column: IOption
  ) => (event: React.MouseEvent) => void;
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
  listContainer: {
    position: "relative"
  },
  button: {
    position: "absolute",
    right: spacing() * 2,
    top: spacing() * 2
  }
}));

const ColumnsSelector: FC<IProps> = ({
  availableColumns,
  selectedColumns,
  handleAddQueryColumn,
  handleRemoveQueryColumn
}) => {
  const classes = useStyles();

  return (
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
};

export default ColumnsSelector;
