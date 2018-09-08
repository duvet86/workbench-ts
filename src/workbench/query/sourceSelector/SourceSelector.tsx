import React, { SFC } from "react";

import SelectInputContainer, {
  IOption
} from "common/select/SelectInputContainer";

import { createStyles, withStyles } from "@material-ui/core/styles";

import StorageIcon from "@material-ui/icons/Storage";

interface IProps {
  targetDataViewId: string;
  dataServices: IOption[];
  handleChangeDataService: (option: IOption) => void;
}

const styles = createStyles({
  iconColour: {
    fill: "#003b86"
  }
});

const OptionsIcon = withStyles(styles)(({ classes }) => (
  <StorageIcon className={classes.iconColour} />
));

const SourceSelector: SFC<IProps> = ({
  targetDataViewId,
  dataServices,
  handleChangeDataService
}) => (
  <SelectInputContainer
    OptionsIcon={OptionsIcon}
    inputLabel="Click here to select a source..."
    value={targetDataViewId}
    options={dataServices}
    handleChange={handleChangeDataService}
  />
);

export default SourceSelector;
