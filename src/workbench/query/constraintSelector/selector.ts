import { createSelector } from "reselect";
import { RootState } from "rootReducer";
import { IOption } from "common/select/SelectInputContainer";

const allowedValuesSelector = (state: RootState) =>
  state.allowedValuesReducer.allowedValues;

export const getAllowedValueOptions = createSelector(
  allowedValuesSelector,
  allowedValues =>
    allowedValues.map<IOption>(({ DisplayValue, ValueVector }) => ({
      label: DisplayValue,
      value: ValueVector
    }))
);
