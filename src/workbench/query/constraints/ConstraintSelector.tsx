import React, { FC } from "react";

import { styled } from "@material-ui/core/styles";

import { IConstraint } from "workbench/types";
import { IFilterCapabilitiesDic } from "workbench/query/types";

import SelectInputContainer, {
  IOption
} from "common/select/SelectInputContainer";
import ConstraintContainer from "workbench/query/constraints/ConstraintContainer";

import ConstraintIcon from "@material-ui/icons/FilterList";

interface IProps {
  elementId: number;
  availableConstraints: Array<IOption<string>>;
  queryConstraints: IConstraint[];
  filterCapabilities: IFilterCapabilitiesDic;
  handledAddQueryConstraint: (target?: IOption) => void;
}

const StyledDiv = styled("div")({
  marginBottom: 30
});

const ConstraintSelector: FC<IProps> = ({
  elementId,
  availableConstraints,
  queryConstraints,
  handledAddQueryConstraint
}) => (
  <>
    <StyledDiv>
      <SelectInputContainer
        reset
        // OptionsIcon={ConstraintIcon}
        inputLabel="Contraint on..."
        options={availableConstraints}
        onChange={handledAddQueryConstraint}
      />
    </StyledDiv>
    {queryConstraints.map(constraint => (
      <ConstraintContainer
        key={constraint.ConstraintIndex}
        elementId={elementId}
        constraint={constraint}
      />
    ))}
  </>
);

export default ConstraintSelector;
