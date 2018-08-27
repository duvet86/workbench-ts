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

import SourceSelector from "workbench/query/sourceSelector/SourceSelector";

interface IOwnProps {
  elementId: number;
  targetDataViewId: string;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IOwnProps;

class SourceSelectorContainer extends Component<Props> {
  public componentDidMount() {
    this.props.dispatchDataServicesRequest();
  }

  public render() {
    const { targetDataViewId, dataServices } = this.props;

    return (
      <SourceSelector
        targetDataViewId={targetDataViewId}
        dataServices={dataServices}
        handleChangeDataService={this.handleChangeDataService}
      />
    );
  }

  private handleChangeDataService = (targetDataViewId: string) => {
    const { elementId, dispatchUpdateDataService } = this.props;

    dispatchUpdateDataService(elementId, targetDataViewId);
  };
}

const mapStateToProps = (state: RootState) => ({
  dataServices: getDataServices(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch<DataServicesAction | QueryAction>
) => ({
  dispatchDataServicesRequest: () => dispatch(dataServicesRequest()),
  dispatchUpdateDataService: (elementId: number, targetDataViewId: string) =>
    dispatch(updateQueryDataService(elementId, targetDataViewId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SourceSelectorContainer);
