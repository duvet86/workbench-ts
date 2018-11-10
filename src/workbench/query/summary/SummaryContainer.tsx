import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "rootReducer";
import {
  IQueryDataTableRequest,
  queryDataTableRequest
} from "workbench/query/actions";
import { getQuerySourceLabel } from "workbench/query/selectors";
import { IQuery } from "workbench/types";

import Summary from "workbench/query/summary/Summary";

interface IOwnProps {
  query: IQuery;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  IOwnProps;

class SummaryContainer extends Component<Props> {
  public componentDidMount() {
    this.props.dispatchDataTableRequest();
  }

  public render() {
    const { query, querySourceLabel, dataTableRows } = this.props;

    return (
      <Summary
        query={query}
        querySourceLabel={querySourceLabel}
        dataTableRows={dataTableRows}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  querySourceLabel: getQuerySourceLabel(state),
  dataTableRows: state.queryConfigReducer.dataTableTows
});

const mapDispatchToProps = (dispatch: Dispatch<IQueryDataTableRequest>) => ({
  dispatchDataTableRequest: (pageSize: number = 25, pageNumber: number = 1) =>
    dispatch(queryDataTableRequest(pageSize, pageNumber))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SummaryContainer);
