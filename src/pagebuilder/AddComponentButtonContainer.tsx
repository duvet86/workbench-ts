import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { batchActions } from "redux-batched-actions";

import { getComponentListAsync } from "pagebuilder/api";
import {
  ErrorActions,
  IErrorResponse,
  handleException
} from "errorPage/actions";
import { IComponentGroup } from "pagebuilder/types";

import { LoadingContainer } from "common/loading";
import AddComponentButton from "pagebuilder/AddComponentButton";

type Props = ReturnType<typeof mapDispatchToProps>;

interface IState {
  isLoading: boolean;
  anchorEl: HTMLElement | undefined;
  componentGroups: IComponentGroup[];
}

class AddComponentButtonContainer extends Component<Props, IState> {
  public state: IState = {
    isLoading: false,
    anchorEl: undefined,
    componentGroups: []
  };

  public async componentDidMount() {
    this.setState({
      isLoading: true
    });

    try {
      const componentGroups = await getComponentListAsync();
      this.setState({
        componentGroups,
        isLoading: false
      });
    } catch (e) {
      this.props.dispatchHandleException(e);
    }
  }

  public render() {
    const { anchorEl, isLoading, componentGroups } = this.state;

    return (
      <LoadingContainer isLoading={isLoading}>
        <AddComponentButton
          anchorEl={anchorEl}
          componentGroups={componentGroups}
          handleClick={this.handleClick}
          handleClose={this.handleClose}
        />
      </LoadingContainer>
    );
  }

  private handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ anchorEl: event.target as HTMLElement });
  };

  private handleClose = () => {
    this.setState({ anchorEl: undefined });
  };
}

const mapDispatchToProps = (dispatch: Dispatch<ErrorActions>) => ({
  dispatchHandleException: (resp: IErrorResponse) => {
    dispatch(batchActions(handleException(resp)));
  }
});

export default connect(
  undefined,
  mapDispatchToProps
)(AddComponentButtonContainer);
