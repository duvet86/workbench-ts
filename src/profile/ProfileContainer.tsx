import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ProfileAction, profileRequest } from "profile/actions";

import { LoadingContainer } from "common/loading";
import Profile from "profile/Profile";

interface IDispatchProps {
  dispatchLoadProfile: () => void;
}

interface IStateProps {
  isLoading: boolean;
  userInfo: {
    Profile: { UserName: string };
  };
  error: any;
}

type Props = IStateProps & IDispatchProps;

interface IStoreState {
  profileReducer: IStateProps;
}

class ProfileContainer extends Component<Props> {
  public static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    userInfo: PropTypes.object
  };

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

const mapDispatchToProps = (dispatch: Dispatch<ProfileAction>) => ({
  dispatchLoadProfile: () => {
    dispatch(profileRequest());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
