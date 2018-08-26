import React, { SFC } from "react";

import { IItemDtc } from "sidebar/myItems/types";
import SelectInput from "common/select/SelectInput";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import StorageIcon from "@material-ui/icons/Storage";

interface IProps extends WithStyles<typeof styles> {
  targetDataViewId: number;
  dataServices: IItemDtc[];
  handleChangeDataService: (selectedDataServiceId: number) => void;
}

const styles = createStyles({
  iconColour: {
    fill: "#003b86"
  }
});

const SourceSelector: SFC<IProps> = ({
  classes,
  targetDataViewId,
  dataServices,
  handleChangeDataService
}) => (
  <SelectInput
    noClear
    OptionsIcon={StorageIcon}
    iconClassName={classes.iconColour}
    inputLabel="Click here to select a source..."
    value={targetDataViewId.toString()}
    options={dataServices}
    handleChange={handleChangeDataService}
  />
);

export default withStyles(styles)(SourceSelector);
