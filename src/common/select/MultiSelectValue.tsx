import React from "react";

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

import Chip from "@material-ui/core/Chip";

interface IProps extends WithStyles<typeof styles> {
  label: string;
  handleDeleteChip: (optionLabel: string) => () => void;
}

const styles = ({ spacing: { unit } }: Theme) =>
  createStyles({
    chip: {
      pmarginLeft: unit / 2
    }
  });

const MultiSelectValue: React.SFC<IProps> = ({
  classes,
  label,
  handleDeleteChip
}) => (
  <Chip
    className={classes.chip}
    label={label}
    onDelete={handleDeleteChip(label)}
  />
);

export default withStyles(styles)(MultiSelectValue);
