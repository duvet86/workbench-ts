import React, { SFC } from "react";

import { IOption } from "common/select/types";
import SelectInput from "common/select/SelectInput";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import StorageIcon from "@material-ui/icons/Storage";

interface IProps {
  targetDataViewId: string;
  dataServices: IOption[];
  handleChangeDataService: (selectedDataServiceId: string) => void;
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
  <SelectInput
    OptionsIcon={OptionsIcon}
    inputLabel="Click here to select a source..."
    value={targetDataViewId}
    options={dataServices}
    handleChange={handleChangeDataService}
  />
);

export default SourceSelector;
