import React, { ChangeEvent, Component } from "react";
import { createSelector } from "reselect";

import { IOption } from "common/select/SelectInputContainer";

import SearchableList from "common/searchableList/SearchableList";

interface IProps {
  label: string;
  items: IOption[];
  handleItemClick: (item: IOption) => (event: React.MouseEvent) => void;
}

interface IState {
  searchString: string;
}

const filterTextSelector = (state: IState) => state.searchString;
const itemsSelector = (_: IState, props: IProps) => props.items;

export default class SearchableListContainer extends Component<IProps, IState> {
  public state = {
    searchString: ""
  };

  private filterList = createSelector(
    filterTextSelector,
    itemsSelector,
    (filterText, items) => items.filter(item => item.label.includes(filterText))
  );

  public render() {
    const { label, handleItemClick } = this.props;
    const { searchString } = this.state;
    const filteredList = this.filterList(this.state, this.props);

    return (
      <SearchableList
        label={label}
        totItems={filteredList.length}
        searchableItems={filteredList}
        searchString={searchString}
        handleItemClick={handleItemClick}
        handleChange={this.handleChange}
        handleClickClearIcon={this.handleClickClearIcon}
      />
    );
  }

  private handleClickClearIcon = () => {
    this.setState({
      searchString: ""
    });
  };

  private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchString: event.target.value
    });
  };
}
