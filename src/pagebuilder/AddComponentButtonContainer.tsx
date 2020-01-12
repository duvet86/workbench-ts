import React, { useState, FC, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { getComponentListAsync } from "pagebuilder/api";
import {
  ErrorActions,
  IErrorResponse,
  handleException
} from "common/errorBoundary/actions";
import { IComponentGroup } from "pagebuilder/types";

import LoadingContainer from "common/loading/LoadingContainer";
import AddComponentButton from "pagebuilder/AddComponentButton";

type Props = ReturnType<typeof mapDispatchToProps>;

const AddComponentButtonContainer: FC<Props> = ({
  dispatchHandleException
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>();
  const [componentGroups, setComponentGroups] = useState<IComponentGroup[]>([]);

  useEffect(() => {
    setIsLoading(true);

    getComponentListAsync()
      .then(componentGroupsResp => {
        setComponentGroups(componentGroupsResp);
        setIsLoading(false);
      })
      .catch(e => dispatchHandleException(e));
  }, [dispatchHandleException]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.target as HTMLElement);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  return (
    <LoadingContainer isLoading={isLoading}>
      <AddComponentButton
        anchorEl={anchorEl}
        componentGroups={componentGroups}
        handleClick={handleClick}
        handleClose={handleClose}
      />
    </LoadingContainer>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<ErrorActions>) => ({
  dispatchHandleException: (resp: IErrorResponse) => {
    dispatch(handleException(resp));
  }
});

export default connect(
  undefined,
  mapDispatchToProps
)(AddComponentButtonContainer);
