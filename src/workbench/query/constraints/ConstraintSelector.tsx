import React, { SFC } from "react";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import { IConstraint } from "workbench/types";
import { IFilterCapabilitiesDic } from "workbench/query/types";

import SelectInputContainer, {
  IOption
} from "common/select/SelectInputContainer";
import ConstraintContainer from "workbench/query/constraints/ConstraintContainer";

import ConstraintIcon from "@material-ui/icons/FilterList";

interface IProps extends WithStyles<typeof styles> {
  elementId: number;
  availableConstraints: Array<IOption<string>>;
  queryConstraints: IConstraint[];
  filterCapabilities: IFilterCapabilitiesDic;
  handledAddQueryConstraint: (target?: IOption) => void;
}

const styles = createStyles({
  constraintTargetSelect: {
    marginBottom: 30
  }
});

const ConstraintSelector: SFC<IProps> = ({
  classes,
  elementId,
  availableConstraints,
  queryConstraints,
  handledAddQueryConstraint
}) => (
  <>
    <div className={classes.constraintTargetSelect}>
      <SelectInputContainer
        reset
        OptionsIcon={ConstraintIcon}
        inputLabel="Contraint on..."
        options={availableConstraints}
        onChange={handledAddQueryConstraint}
      />
    </div>
    {queryConstraints.map(constraint => (
      <ConstraintContainer
        key={constraint.ConstraintIndex}
        elementId={elementId}
        constraint={constraint}
      />
    ))}
  </>
);

export default withStyles(styles)(ConstraintSelector);
