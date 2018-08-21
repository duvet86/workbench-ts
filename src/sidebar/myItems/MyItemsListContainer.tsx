import { Location } from "history";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IFolderChild } from "sidebar/myItems/types";

import { MyItemsAction, myItemsRequest } from "sideBar/myItems/actions";

import { LoadingContainer } from "common/loading";
import MyItemsList from "sideBar/myItems/MyItemsList";

interface IDispatchProps {
  dispatchLoadMyItems: () => void;
}

interface IStateProps {
  isLoading: boolean;
  items: {
    myItems: IFolderChild[];
  };
  location: Location;
  error: any;
}

type Props = IStateProps & IDispatchProps;

interface IStoreState {
  myItemsReducer: IStateProps;
}

class MyItemsListContainer extends Component<Props> {
  public componentDidMount() {
    this.props.dispatchLoadMyItems();
  }

  public render() {
    const { items, location } = this.props;
    return (
      <LoadingContainer isLoading={this.props.isLoading}>
        <MyItemsList items={items} location={location} />
      </LoadingContainer>
    );
  }
}

const mapStateToProps = ({
  myItemsReducer: { isLoading, items, error }
}: IStoreState) => ({
  isLoading,
  items,
  error
});

const mapDispatchToProps = (dispatch: Dispatch<MyItemsAction>) => ({
  dispatchLoadMyItems: () => {
    dispatch(myItemsRequest());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyItemsListContainer);
