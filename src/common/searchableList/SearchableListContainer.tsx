import React, { ChangeEvent, Component } from "react";

import { IOption } from "common/searchableList/types";

import SearchableList from "common/searchableList/SearchableList";

interface IProps {
  label: string;
  items: IOption[];
  onItemClick: (item: IOption) => void;
}

interface IState {
  searchString: string;
  searchableItems: IOption[];
}

class SearchableListContainer extends Component<IProps, IState> {
  public static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    if (nextProps.items.length !== prevState.searchableItems.length) {
      return {
        searchableItems: nextProps.items
      };
    }
    return null;
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      searchString: "",
      searchableItems: props.items
    };
  }

  public render() {
    const { label, items, onItemClick } = this.props;
    const { searchString, searchableItems } = this.state;

    return (
      <SearchableList
        label={label}
        totItems={items.length}
        searchableColumns={searchableItems}
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
      searchableItems: this.props.items
    });
  };

  private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchString: event.target.value,
      searchableItems: event.target.value
        ? this.props.items.filter(({ label }) =>
            label.toLowerCase().includes(event.target.value.toLowerCase())
          )
        : this.props.items
    });
  };
}

export default SearchableListContainer;
