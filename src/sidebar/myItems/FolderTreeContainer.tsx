import { Location } from "history";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import { MyItemsAction, myItemsRequest } from "sidebar/myItems/actions";

import { LoadingContainer } from "common/loading";
import FolderTree from "sidebar/myItems/FolderTree";
import ItemsSelector from "sidebar/myItems/ItemsSelector";

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
    const { items, location, isLoading } = this.props;

    return (
      <LoadingContainer isLoading={isLoading || items == null}>
        <ItemsSelector />
        {items && <FolderTree items={items.myItems} location={location} />}
      </LoadingContainer>
    );
  }
}

const mapStateToProps = ({
  myItemsReducer: { isLoading, items }
}: RootState) => ({
  isLoading,
  items
});

const mapDispatchToProps = (dispatch: Dispatch<MyItemsAction>) => ({
  dispatchLoadMyItems: () => {
    dispatch(myItemsRequest());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FolderTreeContainer);
