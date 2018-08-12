import PropTypes from "prop-types";
import React, { ChangeEvent, Component } from "react";

import SearchableList from "common/searchableList/SearchableList";

import { IColumn } from "common/searchableList/types";

interface IProps {
  label: string;
  items: IColumn[];
  onItemClick: (item: any) => void;
}

interface IState {
  searchString: string;
  searchableColumns: IColumn[];
}

class SearchableListContainer extends Component<IProps, IState> {
  public static propTypes = {
    items: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired
  };

  public static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    if (nextProps.items.length !== prevState.searchableColumns.length) {
      return {
        searchableColumns: nextProps.items
      };
    }
    return null;
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      searchString: "",
      searchableColumns: props.items
    };
  }

  public render() {
    const { label, items, onItemClick } = this.props;
    const { searchString, searchableColumns } = this.state;

    return (
      <SearchableList
        label={label}
        totItems={items.length}
        searchableColumns={searchableColumns}
        searchString={searchString}
        onItemClick={onItemClick}
        handleChange={this.handleChange}
        handleClickClearIcon={this.handleClickClearIcon}
      />
    );
  }

  private handleClickClearIcon = () => {
    this.setState({
      searchString: "",
      searchableColumns: this.props.items
    });
  };

  private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchString: event.target.value,
      searchableColumns: event.target.value
        ? this.props.items.filter(({ Label }: IColumn) =>
            Label.toLowerCase().includes(event.target.value.toLowerCase())
          )
        : this.props.items
    });
  };
}

export default SearchableListContainer;
