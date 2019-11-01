import React, { ChangeEvent, FC } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import {
  updateQueryConstraintValues,
  IUpdateQueryConstraintValues
} from "workbench/query/constraints/actions";

import TextInput from "workbench/query/constraints/TextInput";

interface IOwnProps {
  elementId: number;
  constraintId: number;
  inputType: string;
  displayValue: string;
}

type Props = ReturnType<typeof mapDispatchToProps> & IOwnProps;

const TextInputContainer: FC<Props> = ({
  displayValue,
  inputType,
  elementId,
  constraintId,
  dispatchUpdateQueryConstraintValues
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const vectorValues = [[event.target.value]];
    dispatchUpdateQueryConstraintValues(elementId, constraintId, vectorValues);
  };

  return (
    <TextInput
      inputType={inputType}
      displayValue={displayValue}
      handledUpdateQueryConstraintValues={handleInputChange}
    />
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch<IUpdateQueryConstraintValues>
) => ({
  dispatchUpdateQueryConstraintValues: (
    elementId: number,
    constraintId: number,
    constraintValues: string[][]
  ) =>
    dispatch(
      updateQueryConstraintValues(elementId, constraintId, constraintValues)
    )
});

export default connect(
  undefined,
  mapDispatchToProps
)(TextInputContainer);
