import React, { FC } from "react";

import { NavLink } from "react-router-dom";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import { SvgIconProps } from "@material-ui/core/SvgIcon";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

interface IProps extends WithStyles<typeof styles> {
  IconComponent: React.ComponentType<SvgIconProps>;
  label: string;
  description: string;
  to: string;
}

const styles = createStyles({
  iconColor: {
    color: "initial"
  }
});

const WelcomePageCard: FC<IProps> = ({
  classes,
  IconComponent,
  label,
  description,
  to
}) => (
  <NavLink to={to}>
    <Card>
      <CardContent>
        <IconComponent className={classes.iconColor} />
        <Typography variant="h5" component="h2">
          {label}
        </Typography>
        <Typography component="p">{description}</Typography>
      </CardContent>
    </Card>
  </NavLink>
);

export default withStyles(styles)(WelcomePageCard);
