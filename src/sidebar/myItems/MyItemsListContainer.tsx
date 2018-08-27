import { Location } from "history";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import { MyItemsAction, myItemsRequest } from "sidebar/myItems/actions";

import { LoadingContainer } from "common/loading";
import MyItemsList from "sidebar/myItems/MyItemsList";

interface IOwnProps {
  location: Location;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IOwnProps;

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
)(MyItemsListContainer);
