import React, { ChangeEvent, FC, useState } from "react";

import { IOption } from "common/select/SelectInputContainer";

import SearchableList from "common/searchableList/SearchableList";

interface IProps {
  label: string;
  items: IOption[];
  emptyListLabel?: string;
  handleItemClick: (item: IOption) => (event: React.MouseEvent) => void;
}

const SearchableListContainer: FC<IProps> = ({
  label,
  items,
  emptyListLabel,
  handleItemClick
}) => {
  const [searchString, setSearchString] = useState("");

  const handleClickClearIcon = () => {
    setSearchString("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const filteredList = items.filter(item => item.label.includes(searchString));

  return (
    <SearchableList
      label={label}
      emptyListLabel={emptyListLabel}
      totItems={filteredList.length}
      searchableItems={filteredList}
      searchString={searchString}
      handleItemClick={handleItemClick}
      handleChange={handleChange}
      handleClickClearIcon={handleClickClearIcon}
    />
  );
};

export default SearchableListContainer;
