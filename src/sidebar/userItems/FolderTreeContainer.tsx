import React, { FC } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import { UserItemsActions, userItemsRequest } from "sidebar/userItems/actions";

import LoadingContainer from "common/loading/LoadingContainer";
import FolderTree from "sidebar/userItems/FolderTree";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const FolderTreeContainer: FC<Props> = ({
  isLoading,
  myItems,
  sharedWithMe
}) => {
  return (
    <LoadingContainer isLoading={isLoading}>
      <FolderTree myItems={myItems} sharedWithMe={sharedWithMe} />
    </LoadingContainer>
  );
};

const mapStateToProps = ({
  userItems: { isLoading, myItems, sharedWithMe }
}: RootState) => ({
  isLoading,
  myItems,
  sharedWithMe
});

const mapDispatchToProps = (dispatch: Dispatch<UserItemsActions>) => ({
  dispatchLoadUserItems: () => {
    dispatch(userItemsRequest());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FolderTreeContainer);
