import PropTypes from "prop-types";
import React, { SFC } from "react";

import { IUserInfo } from "profile/types";

import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

interface IProps extends WithStyles<typeof styles> {
  userInfo: IUserInfo;
}

const styles = createStyles({
  container: {
    padding: 25
  }
});

const Profile: SFC<IProps> = ({
  classes,
  userInfo: {
    Profile: { UserName }
  }
}) => (
  <Grid container className={classes.container}>
    <Grid item xs={12}>
      {UserName}
    </Grid>
  </Grid>
);

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
