import React, { SFC } from "react";

import { IColumn } from "workbench/types";
import { IUdsColumnDescriptionDtc } from "workbench/query/types";
import { IOption } from "common/select/SelectInputContainer";

import Grid from "@material-ui/core/Grid";

import SearchableListContainer from "common/searchableList/SearchableListContainer";

interface IProps {
  availableColumns: IUdsColumnDescriptionDtc[];
  selectedColumns: IColumn[];
  handleAddQueryColumn: (column: IOption) => (event: React.MouseEvent) => void;
  handleRemoveQueryColumn: (
    column: IOption
  ) => (event: React.MouseEvent) => void;
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
        items={availableColumns.map(({ Label }) => ({
          label: Label,
          value: Label
        }))}
        handleItemClick={handleAddQueryColumn}
      />
    </Grid>
    <Grid item xs={6}>
      <SearchableListContainer
        label="Selected Columns"
        items={selectedColumns.map(({ Label }) => ({
          label: Label,
          value: Label
        }))}
        handleItemClick={handleRemoveQueryColumn}
      />
    </Grid>
  </Grid>
);

export default ColumnsSelector;
