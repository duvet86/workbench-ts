import React, { FC, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps } from "react-router";
import createEngine, {
  DefaultLinkModel,
  DiagramModel
} from "@projectstorm/react-diagrams";
import Log from "lib/Log";

import { RootState } from "rootReducer";
import {
  sessionRequest,
  ISessionRequest,
  ISessionClean,
  sessionClean
} from "workbench/sessionActions";
import {
  IGraphAddQuery,
  IGraphAddFilter,
  graphAddQuery,
  graphAddFilter
} from "workbench/graphActions";
import { OperatorServiceIds } from "workbench/types";

import { destroySessionAsync } from "workbench/api";

import QueryNodeFactory from "workbench/query/widget/QueryNodeFactory";
import QueryNodeModel from "workbench/query/widget/QueryNodeModel";

import FilterNodeFactory from "workbench/filter/widget/FilterNodeFactory";
import FilterNodeModel from "workbench/filter/widget/FilterNodeModel";

import LoadingContainer from "common/loading/LoadingContainer";
import Workbench from "workbench/Workbench";

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  RouteComponentProps<{ id: string }>;

const diagramEngine = createEngine();

diagramEngine.setMaxNumberPointsPerLink(0);

diagramEngine.getNodeFactories().registerFactory(new FilterNodeFactory());
diagramEngine.getNodeFactories().registerFactory(new QueryNodeFactory());

const model = new DiagramModel();
diagramEngine.setModel(model);

const WorkbenchContainer: FC<Props> = ({
  isLoading,
  match,
  session,
  queries,
  filters,
  connections,
  graph,
  dispatchSessionRequest,
  dispatchSessionClean,
  dispatchAddQuery,
  dispatchAddFilter
}) => {
  // const diagramModel = useRef<DiagramModel>();

  useEffect(() => {
    const dataViewId = match.params.id === "new" ? undefined : match.params.id;
    dispatchSessionRequest(dataViewId);

    diagramEngine.repaintCanvas();

    return function cleanSession() {
      if (session == null) {
        return;
      }
      destroySessionAsync(session.TenantId, session.SessionId)
        .then(() => dispatchSessionClean())
        .catch(e => Log.error("WorkbenchContainer.componentWillUnmount", e));
    };
  }, []);

  // useEffect(() => {
  //   const dataViewId = match.params.id === "new" ? undefined : match.params.id;

  //   dispatchSessionRequest(dataViewId);
  //   diagramEngine.repaintCanvas();
  // }, [match, dispatchSessionRequest]);

  // useEffect(() => {
  //   diagramModel.current = new DiagramModel();

  //   const queryNodes = Object.keys(queries).map(
  //     id => new QueryNodeModel(queries[id])
  //   );

  //   const filterNodes = Object.keys(filters).map(
  //     id => new FilterNodeModel(filters[id])
  //   );

  //   diagramModel.current.addAll(...queryNodes);
  //   diagramModel.current.addAll(...filterNodes);

  //   const links: DefaultLinkModel[] = [];
  //   for (const id of Object.keys(connections)) {
  //     const connection = connections[id];

  //     const nodeFrom = diagramModel.current.getNode(
  //       connection.FromElementId.toString()
  //     );

  //     const nodeTo = diagramModel.current.getNode(
  //       connection.ToElementId.toString()
  //     );

  //     if (nodeFrom == null || nodeTo == null) {
  //       break;
  //     }

  //     const portFrom = nodeFrom.getPort("from");
  //     const portTo = nodeTo.getPort("to");

  //     if (portFrom == null || portTo == null) {
  //       break;
  //     }

  //     const link = new DefaultLinkModel();

  //     link.setSourcePort(portFrom);
  //     link.setTargetPort(portTo);
  //   }

  //   diagramModel.current.addAll(...links);

  //   diagramEngine.setModel(diagramModel.current);
  //   diagramEngine.repaintCanvas();
  // }, [queries, filters, connections]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    if (graph == null) {
      throw new Error("Graph cannot be null.");
    }

    const operatorServiceId = event.dataTransfer.getData("ELEMENT");
    const points = diagramEngine.getRelativeMousePoint(event);

    switch (operatorServiceId) {
      case OperatorServiceIds.QUERY:
        dispatchAddQuery(graph.NextElementId, points.x, points.y);
        break;
      case OperatorServiceIds.FILTER:
        dispatchAddFilter(graph.NextElementId, points.x, points.y);
        break;
      default:
        break;
    }
  };

  return (
    <LoadingContainer isLoading={isLoading}>
      <Workbench
        diagramEngine={diagramEngine}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
      />
    </LoadingContainer>
  );
};

const mapStateToProps = ({ sessionGraph: { ...state } }: RootState) => state;

const mapDispatchToProps = (
  dispatch: Dispatch<
    ISessionRequest | ISessionClean | IGraphAddQuery | IGraphAddFilter
  >
) => ({
  dispatchSessionRequest: (dataViewId?: string) => {
    dispatch(sessionRequest(dataViewId));
  },
  dispatchAddQuery: (elementId: number, x: number, y: number) =>
    dispatch(graphAddQuery(elementId, x, y)),
  dispatchAddFilter: (elementId: number, x: number, y: number) =>
    dispatch(graphAddFilter(elementId, x, y)),
  dispatchSessionClean: () => dispatch(sessionClean())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkbenchContainer);
