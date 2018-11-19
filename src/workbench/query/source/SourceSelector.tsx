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

const iconStyles = createStyles({
  iconColour: {
    fill: "#003b86"
  }
});

const styledIcon: SFC<WithStyles<typeof iconStyles>> = ({ classes }) => (
  <StorageIcon className={classes.iconColour} />
);

const OptionsIcon = withStyles(iconStyles)(styledIcon);

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 3
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
      OptionsIcon={OptionsIcon}
      inputLabel="Query Source"
      initValue={initTargetDataViewId}
      options={dataServices}
      onChange={handleChangeDataService}
    />
  </Paper>
);

export default withStyles(styles)(SourceSelector);
