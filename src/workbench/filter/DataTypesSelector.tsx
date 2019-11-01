import React, { FC } from "react";

import { styled } from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import SelectInputContainer, {
  IOption
} from "common/select/SelectInputContainer";

interface IProps {
  selectedValues: string[];
  allowedValueOptions: IOption[];
  handledUpdateQueryConstraintValues: (selectedOptions?: IOption[]) => void;
}

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  flexGrow: 1,
  margin: theme.spacing()
}));

const DataTypesSelector: FC<IProps> = ({
  selectedValues,
  allowedValueOptions,
  handledUpdateQueryConstraintValues
}) => (
  <StyledFormControl>
    <SelectInputContainer
      isMulti
      initValue={selectedValues}
      options={allowedValueOptions}
      onChange={handledUpdateQueryConstraintValues}
    />
  </StyledFormControl>
);

export default DataTypesSelector;
