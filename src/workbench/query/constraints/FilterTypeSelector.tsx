import React, { FC } from "react";

import { IFilterCapabilitiesDic } from "workbench/query/types";

import { makeStyles, Theme } from "@material-ui/core/styles";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

interface IProps {
  constraintId: number;
  filterType: string;
  dataType: string;
  filterCapabilities: IFilterCapabilitiesDic;
  isFullWidth: boolean;
  handledUpdateQueryConstraintType: (
    constraintId: number
  ) => React.ChangeEventHandler<{ name?: string; value: unknown }>;
}

const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    flexShrink: 0,
    flexBasis: `${spacing() * 2}%`,
    margin: spacing()
  },
  rootFullWidth: {
    flexShrink: 0,
    flex: 1,
    margin: spacing()
  }
}));

const FilterTypeSelector: FC<IProps> = ({
  filterCapabilities,
  constraintId,
  filterType,
  dataType,
  isFullWidth,
  handledUpdateQueryConstraintType
}) => {
  const classes = useStyles();

  return (
    <FormControl className={isFullWidth ? classes.rootFullWidth : classes.root}>
      <Select
        autoWidth
        value={filterType}
        onChange={handledUpdateQueryConstraintType(constraintId)}
      >
        {filterCapabilities[dataType].map(({ Label, Type }, i) => (
          <MenuItem key={i} value={Type}>
            {Label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterTypeSelector;
