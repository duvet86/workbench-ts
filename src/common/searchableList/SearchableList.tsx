import React, { ChangeEventHandler, SFC } from "react";

import {
  AutoSizer,
  List as VirtualizedList,
  ListRowProps
} from "react-virtualized";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import { IOption } from "common/select/SelectInputContainer";
import NoOption from "common/select/NoOption";

import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import ClearIcon from "@material-ui/icons/Clear";

import Row from "common/searchableList/Row";

interface IProps extends WithStyles<typeof styles> {
  label: string;
  totItems: number;
  searchableItems: IOption[];
  searchString: string;
  handleItemClick: (column: IOption) => (event: React.MouseEvent) => void;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleClickClearIcon: () => void;
}

const styles = createStyles({
  list: {
    height: "100%"
  },
  paper: {
    padding: 10
  }
});

const noRowsRenderer = () => <NoOption />;

const rowRenderer = (
  searchableItems: IOption[],
  handleItemClick: (column: IOption) => (event: React.MouseEvent) => void
) => ({ index, key, style }: ListRowProps) => {
  const option = searchableItems[index];
  const handleClick = handleItemClick(option);

  return (
    <Row key={key} style={style} option={option} handleClick={handleClick} />
  );
};

const SearchableList: SFC<IProps> = ({
  classes,
  label,
  totItems,
  searchableItems,
  searchString,
  handleItemClick,
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
          disabled={searchableItems.length === 0}
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
            rowCount={searchableItems.length}
            rowHeight={41}
            rowRenderer={rowRenderer(searchableItems, handleItemClick)}
            noRowsRenderer={noRowsRenderer}
          />
        )}
      </AutoSizer>
    </List>
  </Paper>
);

export default withStyles(styles)(SearchableList);
