import React, { SFC } from "react";
import PropTypes from "prop-types";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import StorageIcon from "@material-ui/icons/Storage";

import SelectInput from "common/select/SelectInput";

interface IProps extends WithStyles<typeof styles> {
  targetDataViewId: number;
  dataServices: any[];
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

SourceSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  dataServices: PropTypes.array.isRequired,
  handleChangeDataService: PropTypes.func.isRequired,
  targetDataViewId: PropTypes.string
};

export default withStyles(styles)(SourceSelector);
