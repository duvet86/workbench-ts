import React, { SFC } from "react";

import Grid from "@material-ui/core/Grid";

import SearchableListContainer from "common/searchableList/SearchableListContainer";

interface IProps {
  availableColumns: any[];
  selectedColumns: any[];
  handleAddQueryColumn: (column: any) => void;
  handleRemoveQueryColumn: (
    {
      ColumnName
    }: {
      ColumnName: string;
    }
  ) => void;
}

const ColumnsSelector: SFC<IProps> = ({
  availableColumns,
  selectedColumns,
  handleAddQueryColumn,
  handleRemoveQueryColumn
}) => (
  <Grid container spacing={16}>
    <Grid item xs={6}>
      <SearchableListContainer
        label="Available Columns"
        items={availableColumns}
        onItemClick={handleAddQueryColumn}
      />
    </Grid>
    <Grid item xs={6}>
      <SearchableListContainer
        label="Selected Columns"
        items={selectedColumns}
        onItemClick={handleRemoveQueryColumn}
      />
    </Grid>
  </Grid>
);

export default ColumnsSelector;
