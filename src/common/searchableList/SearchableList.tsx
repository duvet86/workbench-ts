import React, { ChangeEventHandler, SFC } from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import { AutoSizer, List as VirtualizedList } from "react-virtualized";

import { IColumn } from "common/searchableList/types";

import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import ClearIcon from "@material-ui/icons/Clear";

import rowRenderer from "common/searchableList/rowRenderer";

interface IProps extends WithStyles<typeof styles> {
  label: string;
  totItems: number;
  searchableColumns: IColumn[];
  searchString: string;
  onItemClick: (column: IColumn) => void;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleClickClearIcon: () => void;
}

const styles = createStyles({
  iconColour: {
    fill: "#003b86"
  },
  list: {
    height: "100%"
  },
  listItem: {
    paddingLeft: 15
  },
  listItemText: {
    display: "flex"
  },
  listItemTextPrimary: {
    flexBasis: "35%"
  },
  paper: {
    padding: 10
  }
});

const SearchableList: SFC<IProps> = ({
  classes,
  label,
  totItems,
  searchableColumns,
  searchString,
  onItemClick,
  handleChange,
  handleClickClearIcon
}) => (
  <Paper className={classes.paper}>
    <Typography variant="subheading">{`${label} (${totItems})`}</Typography>
    <List className={classes.list} component="div" disablePadding>
      <FormControl fullWidth>
        <InputLabel>Search</InputLabel>
        <Input
          value={searchString}
          onChange={handleChange}
          disabled={searchableColumns.length === 0}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Clear"
                onClick={handleClickClearIcon}
                onMouseDown={handleClickClearIcon}
              >
                {searchString ? <ClearIcon /> : null}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <AutoSizer disableHeight>
        {({ width }) => (
          <VirtualizedList
            width={width}
            height={245}
            rowCount={searchableColumns.length}
            rowHeight={41}
            rowRenderer={rowRenderer(classes, searchableColumns, onItemClick)}
          />
        )}
      </AutoSizer>
    </List>
  </Paper>
);

export default withStyles(styles)(SearchableList);
