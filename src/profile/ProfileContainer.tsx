import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import { IProfileRequest, profileRequest } from "profile/actions";

import { LoadingContainer } from "common/loading";
import Profile from "profile/Profile";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class ProfileContainer extends Component<Props> {
  public componentDidMount() {
    this.props.dispatchLoadProfile();
  }

  public render() {
    return (
      <LoadingContainer isLoading={this.props.isLoading}>
        <Profile {...this.props} />
      </LoadingContainer>
    );
  }
}

const mapStateToProps = ({
  profileReducer: { isLoading, userInfo }
}: RootState) => ({
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
