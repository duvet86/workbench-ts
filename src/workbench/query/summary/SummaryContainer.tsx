import React, { FC } from "react";
import { connect } from "react-redux";

import { RootState } from "rootReducer";
import { getQuerySourceLabel } from "workbench/query/selectors";
import { IQuery } from "workbench/types";

import Summary from "workbench/query/summary/Summary";

interface IOwnProps {
  query: IQuery;
}

type Props = ReturnType<typeof mapStateToProps> & IOwnProps;

const SummaryContainer: FC<Props> = ({ query, querySourceLabel }) => (
  <Summary query={query} querySourceLabel={querySourceLabel} />
);

const mapStateToProps = (state: RootState) => ({
  querySourceLabel: getQuerySourceLabel(state)
});

export default connect(mapStateToProps)(SummaryContainer);
