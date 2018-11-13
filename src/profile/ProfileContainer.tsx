import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import { IProfileRequest, profileRequest } from "profile/actions";

import LoadingContainer from "common/loading/LoadingContainer";
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
        {this.props.userInfo && <Profile userInfo={this.props.userInfo} />}
      </LoadingContainer>
    );
  }
}

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
