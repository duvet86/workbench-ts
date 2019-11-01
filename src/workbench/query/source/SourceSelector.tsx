import React, { FC } from "react";

import SelectInputContainer, {
  IOption
} from "common/select/SelectInputContainer";

import { makeStyles, Theme } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

import StorageIcon from "@material-ui/icons/Storage";

interface IProps {
  initTargetDataViewId: string;
  dataServices: IOption[];
  handleChangeDataService: (option?: IOption) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing() * 3,
    marginBottom: theme.spacing() * 3
  },
  iconColour: {
    fill: "#003b86"
  }
}));

const SourceSelector: FC<IProps> = ({
  initTargetDataViewId,
  dataServices,
  handleChangeDataService
}) => {
  const classes = useStyles();

  return (
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
};

export default SourceSelector;
