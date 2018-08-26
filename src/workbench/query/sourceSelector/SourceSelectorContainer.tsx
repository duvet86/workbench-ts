import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { updateQueryDataService, QueryAction } from "workbench/actions";
import {
  dataServicesRequest,
  DataServicesAction
} from "workbench/query/actions";

import { IItemDtc } from "sidebar/myItems/types";

import { getDataServices, IState } from "workbench/query/selectors";

import SourceSelector from "workbench/query/sourceSelector/SourceSelector";

interface IDispatchProps {
  dispatchDataServicesRequest: () => void;
  dispatchUpdateDataService: (
    elementId: number,
    targetDataViewId: string
  ) => void;
}

interface IStateProps {
  elementId: number;
  targetDataViewId: string;
  dataServices: IItemDtc[];
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

  private handleChangeDataService = (targetDataViewId: string) => {
    const { elementId, dispatchUpdateDataService } = this.props;

    dispatchUpdateDataService(elementId, targetDataViewId);
  };
}

const mapStateToProps = (state: IState) => ({
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
