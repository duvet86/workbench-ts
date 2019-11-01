import React, { FC } from "react";

import { IUserInfo } from "profile/types";

import { styled } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

interface IProps {
  userInfo: IUserInfo;
}

const StyledGrid = styled(Grid)({
  padding: 25
});

const Profile: FC<IProps> = ({
  userInfo: {
    Profile: { UserName }
  }
}) => (
  <StyledGrid container>
    <Grid item xs={12}>
      {UserName}
    </Grid>
  </StyledGrid>
);

export default Profile;
