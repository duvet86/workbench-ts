import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import { updateQuerySource, QueryActions } from "workbench/query/actions";
import {
  dataServicesRequest,
  DataServicesAction
} from "workbench/query/source/actions";
import { getDataServices } from "workbench/query/selectors";

import { IOption } from "common/select/SelectInputContainer";
import SourceSelector from "workbench/query/source/SourceSelector";

interface IOwnProps {
  elementId: number;
  initTargetDataViewId: string;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IOwnProps;

const SourceSelectorContainer: FC<Props> = ({
  initTargetDataViewId,
  dataServices,
  elementId,
  dispatchUpdateDataService,
  dispatchDataServicesRequest
}) => {
  useEffect(() => {
    dispatchDataServicesRequest();
  }, []);

  const handleChangeDataService = (option?: IOption) => {
    const targetDataViewId = option != null ? option.value : undefined;
    const dataServiceLabel = option != null ? option.label : undefined;

    dispatchUpdateDataService(elementId, targetDataViewId, dataServiceLabel);
  };

  return (
    <SourceSelector
      initTargetDataViewId={initTargetDataViewId}
      dataServices={dataServices}
      handleChangeDataService={handleChangeDataService}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  dataServices: getDataServices(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch<DataServicesAction | QueryActions>
) => ({
  dispatchDataServicesRequest: () => dispatch(dataServicesRequest()),
  dispatchUpdateDataService: (
    elementId: number,
    targetDataViewId?: string,
    dataServiceLabel?: string
  ) =>
    dispatch(updateQuerySource(elementId, targetDataViewId, dataServiceLabel))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SourceSelectorContainer);
