import React, { ChangeEventHandler, FC } from "react";

import {
  FixedSizeList as VirtualizedList,
  ListChildComponentProps
} from "react-window";

import { makeStyles } from "@material-ui/core/styles";

import { IOption } from "common/select/SelectInputContainer";

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
import EmptyList from "common/searchableList/EmptyList";

export const LIST_HEIGHT = 245;

interface IProps {
  label: string;
  totItems: number;
  searchableItems: IOption[];
  searchString: string;
  handleItemClick: (column: IOption) => (event: React.MouseEvent) => void;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleClickClearIcon: () => void;
  emptyListLabel?: string;
}

const useStyles = makeStyles({
  list: {
    height: "100%"
  },
  paper: {
    padding: 10
  }
});

const rowRenderer = (
  searchableItems: IOption[],
  handleItemClick: (column: IOption) => (event: React.MouseEvent) => void
) => ({ index, style }: ListChildComponentProps) => {
  const option = searchableItems[index];
  const handleClick = handleItemClick(option);

  return <Row style={style} option={option} handleClick={handleClick} />;
};

const SearchableList: FC<IProps> = ({
  label,
  totItems,
  searchableItems,
  searchString,
  handleItemClick,
  handleChange,
  handleClickClearIcon,
  emptyListLabel
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="subtitle1">{`${label} (${totItems})`}</Typography>
      <List className={classes.list} component={"div" as "ul"} disablePadding>
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
        {searchableItems.length === 0 && (
          <EmptyList emptyListLabel={emptyListLabel} />
        )}
        {searchableItems.length > 0 && (
          <VirtualizedList
            width="100%"
            height={LIST_HEIGHT}
            itemCount={searchableItems.length}
            itemSize={41}
          >
            {rowRenderer(searchableItems, handleItemClick)}
          </VirtualizedList>
        )}
      </List>
    </Paper>
  );
};

export default SearchableList;
