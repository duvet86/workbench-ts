import { createSelector } from "reselect";
import { IState, IOption } from "common/select/SelectInputContainer";

const selectedOptionsSelector = (state: IState<any>) => state.selectedOption;

export const getMultiSelectValue = createSelector(
  selectedOptionsSelector,
  selectedOptions =>
    (selectedOptions as Array<IOption<any>>).map(({ label }) => label)
);
