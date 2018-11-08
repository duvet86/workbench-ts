import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import { updateQueryDataService, QueryAction } from "workbench/actions";
import {
  dataServicesRequest,
  DataServicesAction
} from "workbench/query/actions";
import { getDataServices } from "workbench/query/selectors";

import { IOption } from "common/select/SelectInputContainer";

import SourceSelector from "workbench/query/sourceSelector/SourceSelector";

interface IOwnProps {
  elementId: number;
  initTargetDataViewId: string;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IOwnProps;

class SourceSelectorContainer extends Component<Props> {
  public componentDidMount() {
    this.props.dispatchDataServicesRequest();
  }

  public render() {
    const { initTargetDataViewId, dataServices } = this.props;

    return (
      <SourceSelector
        initTargetDataViewId={initTargetDataViewId}
        dataServices={dataServices}
        handleChangeDataService={this.handleChangeDataService}
      />
    );
  }

  private handleChangeDataService = (option?: IOption) => {
    const { elementId, dispatchUpdateDataService } = this.props;

    const targetDataViewId = option != null ? option.value : undefined;
    const dataServiceLabel = option != null ? option.label : undefined;

    dispatchUpdateDataService(elementId, targetDataViewId, dataServiceLabel);
  };
}

const mapStateToProps = (state: RootState) => ({
  dataServices: getDataServices(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch<DataServicesAction | QueryAction>
) => ({
  dispatchDataServicesRequest: () => dispatch(dataServicesRequest()),
  dispatchUpdateDataService: (
    elementId: number,
    targetDataViewId?: string,
    dataServiceLabel?: string
  ) =>
    dispatch(
      updateQueryDataService(elementId, targetDataViewId, dataServiceLabel)
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SourceSelectorContainer);
