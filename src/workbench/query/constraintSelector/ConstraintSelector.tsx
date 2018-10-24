import React, { Fragment, SFC } from "react";

import { IConstraint } from "workbench/types";
import {
  IFilterCapabilitiesDic,
  IAvailableColumns,
  IAvailableFilters
} from "workbench/query/types";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import SelectInputContainer, {
  IOption
} from "common/select/SelectInputContainer";
import FilterConstraint from "workbench/query/constraintSelector/FilterConstraint";

import ConstraintIcon from "@material-ui/icons/FilterList";

interface IProps extends WithStyles<typeof styles> {
  availableConstraintsObj: {
    availableConstraints: Array<IOption<string>>;
    filtersDic: IAvailableFilters;
    columnsDic: IAvailableColumns;
  };
  queryConstraints: IConstraint[];
  filterCapabilities: IFilterCapabilitiesDic;
  handledAddQueryConstraint: (target?: IOption) => void;
  handledUpdateQueryConstraintType: (
    constraintId: number
  ) => React.ChangeEventHandler<HTMLSelectElement>;
  handledUpdateQueryConstraintValues: (
    constraintId: number,
    dataType: string
  ) => React.ChangeEventHandler<HTMLInputElement>;
  handledRemoveQueryConstraint: (
    constraintId: number
  ) => React.MouseEventHandler;
}

const styles = ({ spacing: { unit } }: Theme) =>
  createStyles({
    constraintTargetSelect: {
      marginBottom: 30
    }
  });

// const getConstraintLabel = (
//   column?: IUdsColumnDescriptionDtc,
//   filter?: IUdsFilterDescriptionDtc
// ) => {
//   return (column && column.Label) || (filter && filter.Label);
// };

const ConstraintSelector: SFC<IProps> = ({
  classes,
  availableConstraintsObj: { availableConstraints, columnsDic, filtersDic },
  queryConstraints,
  filterCapabilities,
  handledAddQueryConstraint,
  handledUpdateQueryConstraintType,
  handledUpdateQueryConstraintValues,
  handledRemoveQueryConstraint
}) => (
  <Fragment>
    <div className={classes.constraintTargetSelect}>
      <SelectInputContainer
        OptionsIcon={ConstraintIcon}
        inputLabel="Contraint on..."
        options={availableConstraints}
        handleChange={handledAddQueryConstraint}
      />
    </div>
    {queryConstraints.length > 0 &&
      queryConstraints.map(
        ({ ConstraintId, DataType, FilterType, FilterName, ColumnName }) => {
          if (FilterType != null && FilterName != null) {
            return (
              <FilterConstraint
                key={ConstraintId}
                filtersDic={filtersDic}
                filterCapabilities={filterCapabilities}
                constraintId={ConstraintId}
                dataType={DataType}
                filterType={FilterType}
                filterName={FilterName}
                handledUpdateQueryConstraintType={
                  handledUpdateQueryConstraintType
                }
                handledUpdateQueryConstraintValues={
                  handledUpdateQueryConstraintValues
                }
                handledRemoveQueryConstraint={handledRemoveQueryConstraint}
              />
            );
          }

          return <div key={ConstraintId}>TODO</div>;
        }
      )}
  </Fragment>
);

export default withStyles(styles)(ConstraintSelector);
