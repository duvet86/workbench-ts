import React, { SFC } from "react";

import { IColumn } from "workbench/types";
import { IUdsColumnDescriptionDtc } from "workbench/query/types";
import { IOption } from "common/searchableList/types";

import Grid from "@material-ui/core/Grid";

import SearchableListContainer from "common/searchableList/SearchableListContainer";

interface IProps {
  availableColumns: IUdsColumnDescriptionDtc[];
  selectedColumns: IColumn[];
  handleAddQueryColumn: (column: IOption) => void;
  handleRemoveQueryColumn: (column: IOption) => void;
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
        onItemClick={handleAddQueryColumn}
      />
    </Grid>
    <Grid item xs={6}>
      <SearchableListContainer
        label="Selected Columns"
        items={selectedColumns.map(({ Label }) => ({
          label: Label,
          value: Label
        }))}
        onItemClick={handleRemoveQueryColumn}
      />
    </Grid>
  </Grid>
);

export default ColumnsSelector;
