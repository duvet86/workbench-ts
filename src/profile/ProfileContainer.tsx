import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import { IProfileRequest, profileRequest } from "profile/actions";

import LoadingContainer from "common/loading/LoadingContainer";
import Profile from "profile/Profile";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const ProfileContainer: FC<Props> = ({
  isLoading,
  userInfo,
  dispatchLoadProfile
}) => {
  useEffect(() => {
    dispatchLoadProfile();
  }, []);

  return (
    <LoadingContainer isLoading={isLoading}>
      {userInfo && <Profile userInfo={userInfo} />}
    </LoadingContainer>
  );
};

const mapStateToProps = ({ profile: { isLoading, userInfo } }: RootState) => ({
  isLoading,
  userInfo
});

const mapDispatchToProps = (dispatch: Dispatch<IProfileRequest>) => ({
  dispatchLoadProfile: () => {
    dispatch(profileRequest());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
