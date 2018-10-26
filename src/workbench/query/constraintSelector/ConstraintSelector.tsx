import React, { SFC } from "react";

import { IConstraint } from "workbench/types";
import {
  IFilterCapabilitiesDic,
  IAvailableColumns,
  IAvailableFilters
} from "workbench/query/types";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import SelectInputContainer, {
  IOption
} from "common/select/SelectInputContainer";
import FilterConstraint from "workbench/query/constraintSelector/FilterConstraint";

import ConstraintIcon from "@material-ui/icons/FilterList";

interface IProps extends WithStyles<typeof styles> {
  availableConstraintsObj: {
    availableConstraints: Array<IOption<string>>;
    availableFiltersDic: IAvailableFilters;
    availableColumnsDic: IAvailableColumns;
  };
  queryConstraints: IConstraint[];
  // filterCapabilities: IFilterCapabilitiesDic;
  handledAddQueryConstraint: (target?: IOption) => void;
  // handledUpdateQueryConstraintType: (
  //   constraintId: number
  // ) => React.ChangeEventHandler<HTMLSelectElement>;
  // handledUpdateQueryConstraintValues: (
  //   constraintId: number,
  //   dataType: string
  // ) => React.ChangeEventHandler<HTMLInputElement>;
  // handledRemoveQueryConstraint: (
  //   constraintId: number
  // ) => React.MouseEventHandler;
}

const styles = createStyles({
  constraintTargetSelect: {
    marginBottom: 30
  }
});

const ConstraintSelector: SFC<IProps> = ({
  classes,
  availableConstraintsObj: { availableConstraints, availableFiltersDic },
  queryConstraints,
  // filterCapabilities,
  handledAddQueryConstraint
  // handledUpdateQueryConstraintType,
  // handledUpdateQueryConstraintValues,
  // handledRemoveQueryConstraint
}) => (
  <>
    <div className={classes.constraintTargetSelect}>
      <SelectInputContainer
        OptionsIcon={ConstraintIcon}
        inputLabel="Contraint on..."
        options={availableConstraints}
        handleChange={handledAddQueryConstraint}
      />
    </div>
    {queryConstraints.map(
      ({ ConstraintId, DataType, FilterType, FilterName }) => {
        // if (FilterType != null && FilterName != null) {
        //   return (
        //     <FilterConstraint
        //       key={ConstraintId}
        //       availableFiltersDic={availableFiltersDic}
        //       filterCapabilities={filterCapabilities}
        //       constraintId={ConstraintId}
        //       dataType={DataType}
        //       filterType={FilterType}
        //       filterName={FilterName}
        //       handledUpdateQueryConstraintType={
        //         handledUpdateQueryConstraintType
        //       }
        //       handledUpdateQueryConstraintValues={
        //         handledUpdateQueryConstraintValues
        //       }
        //       handledRemoveQueryConstraint={handledRemoveQueryConstraint}
        //     />
        //   );
        // }

        return <div key={ConstraintId}>TODO</div>;
      }
    )}
  </>
);

export default withStyles(styles)(ConstraintSelector);
