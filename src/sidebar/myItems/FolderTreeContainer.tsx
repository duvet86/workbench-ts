import { Location } from "history";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import {
  MyItemsAction,
  myItemsRequest,
  updateFolderTree
} from "sidebar/myItems/actions";

import { LoadingContainer } from "common/loading";
import FolderTree from "sidebar/myItems/FolderTree";
import FolderTreeTabs from "sidebar/myItems/FolderTreeTabs";

interface IOwnProps {
  location: Location;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IOwnProps;

class FolderTreeContainer extends Component<Props> {
  public componentDidMount() {
    this.props.dispatchLoadMyItems();
  }

  public render() {
    const {
      currentTree,
      myItems,
      sharedWithMe,
      location,
      isLoading
    } = this.props;

    return (
      <LoadingContainer isLoading={isLoading}>
        <FolderTreeTabs
          currentTree={currentTree}
          handleTreeChange={this.handleTreeChange}
        />
        <FolderTree
          items={currentTree === 0 ? myItems : sharedWithMe}
          location={location}
        />
      </LoadingContainer>
    );
  }

  private handleTreeChange = (_: React.ChangeEvent<{}>, currentTree: 0 | 1) => {
    this.props.dispatchUpdateFolderTree(currentTree);
  };
}

const mapStateToProps = ({
  myItemsReducer: { isLoading, currentTree, myItems, sharedWithMe }
}: RootState) => ({
  isLoading,
  currentTree,
  myItems,
  sharedWithMe
});

const mapDispatchToProps = (dispatch: Dispatch<MyItemsAction>) => ({
  dispatchLoadMyItems: () => {
    dispatch(myItemsRequest());
  },
  dispatchUpdateFolderTree: (currentTree: 0 | 1) => {
    dispatch(updateFolderTree(currentTree));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FolderTreeContainer);
