import React, { FC } from "react";
import { styled } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import StorageIcon from "@material-ui/icons/Storage";

import SelectInputContainer, {
  IOption
} from "common/select/SelectInputContainer";

interface IProps {
  initTargetDataViewId: string;
  dataServices: IOption[];
  handleChangeDataService: (option?: IOption) => void;
}

const StyledStorageIcon = styled(StorageIcon)({
  fill: "#003b86"
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing() * 3,
  marginBottom: theme.spacing() * 3
}));

const SourceSelector: FC<IProps> = ({
  initTargetDataViewId,
  dataServices,
  handleChangeDataService
}) => (
  <StyledPaper>
    <SelectInputContainer
      required
      OptionsIcon={StyledStorageIcon}
      inputLabel="Query Source"
      initValue={initTargetDataViewId}
      options={dataServices}
      onChange={handleChangeDataService}
    />
  </StyledPaper>
);

export default SourceSelector;
