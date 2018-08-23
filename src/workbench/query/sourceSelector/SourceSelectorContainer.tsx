import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { updateQueryDataService, QueryAction } from "workbench/actions";
import {
  dataServicesRequest,
  DataServicesAction
} from "workbench/query/actions";

import { getDataServices } from "workbench/query/selectors";

import SourceSelector from "workbench/query/sourceSelector/SourceSelector";

interface IDispatchProps {
  dispatchDataServicesRequest: () => void;
  dispatchDescribeQuery: (
    elementId: number,
    query: {
      TargetDataViewId: number;
    }
  ) => void;
}

interface IStateProps {
  elementId: number;
  targetDataViewId: number;
  dataServices: any[];
}

type Props = IStateProps & IDispatchProps;

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

  private handleChangeDataService = (selectedDataServiceId: number) => {
    const { elementId, dispatchDescribeQuery } = this.props;

    dispatchDescribeQuery(elementId, {
      TargetDataViewId: selectedDataServiceId
    });
  };
}

const mapStateToProps = (state: any) => ({
  dataServices: getDataServices(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch<DataServicesAction | QueryAction>
) => ({
  dispatchDataServicesRequest: () => dispatch(dataServicesRequest()),
  dispatchDescribeQuery: (elementId: number, query: any) =>
    dispatch(updateQueryDataService(elementId, query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SourceSelectorContainer);
