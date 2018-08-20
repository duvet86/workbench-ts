import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IProfileRequest, profileRequest } from "profile/actions";

import { LoadingContainer } from "common/loading";
import Profile from "profile/Profile";

import { IUserInfo } from "profile/types";

interface IDispatchProps {
  dispatchLoadProfile: () => void;
}

interface IStateProps {
  isLoading: boolean;
  userInfo: IUserInfo;
  error: any;
}

type Props = IStateProps & IDispatchProps;

interface IStoreState {
  profileReducer: IStateProps;
}

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
  profileReducer: { isLoading, userInfo, error }
}: IStoreState) => ({
  isLoading,
  userInfo,
  error
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
