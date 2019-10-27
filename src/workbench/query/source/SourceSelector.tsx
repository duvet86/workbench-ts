import React, { SFC } from "react";

import SelectInputContainer, {
  IOption
} from "common/select/SelectInputContainer";

import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

import StorageIcon from "@material-ui/icons/Storage";

interface IProps extends WithStyles<typeof styles> {
  initTargetDataViewId: string;
  dataServices: IOption[];
  handleChangeDataService: (option?: IOption) => void;
}

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing() * 3,
      marginBottom: theme.spacing() * 3
    },
    iconColour: {
      fill: "#003b86"
    }
  });

const SourceSelector: SFC<IProps> = ({
  classes,
  initTargetDataViewId,
  dataServices,
  handleChangeDataService
}) => (
  <Paper className={classes.paper}>
    <SelectInputContainer
      required
      OptionsIcon={<StorageIcon className={classes.iconColour} />}
      inputLabel="Query Source"
      initValue={initTargetDataViewId}
      options={dataServices}
      onChange={handleChangeDataService}
    />
  </Paper>
);

export default withStyles(styles)(SourceSelector);
