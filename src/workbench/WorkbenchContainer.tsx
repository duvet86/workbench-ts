import "storm-react-diagrams/dist/style.min.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps } from "react-router";
import { DiagramModel, DiagramEngine } from "storm-react-diagrams";

import { RootState } from "rootReducer";
import { sessionRequest, SessionAction } from "workbench/actions";
import { addQuery, QueryAction } from "workbench/query/actions";
import { ElementType } from "sidebar/operators/operatorsData";

import { destroySessionAsync } from "workbench/api";

import WidgetPortFactory from "workbench/WidgetPortFactory";
import WidgetPortModel from "workbench/WidgetPortModel";

import QueryNodeFactory from "workbench/query/widget/QueryNodeFactory";
import QueryNodeModel from "workbench/query/widget/QueryNodeModel";

import FilterNodeFactory from "workbench/filter/FilterNodeFactory";
import FilterNodeModel from "workbench/filter/FilterNodeModel";

import LoadingContainer from "common/loading/LoadingContainer";
import Workbench from "workbench/Workbench";

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  RouteComponentProps<{ id: string }>;

class WorkbenchContainer extends Component<Props> {
  private diagramEngine: DiagramEngine;

  constructor(props: Props) {
    super(props);

    this.diagramEngine = new DiagramEngine();
    this.diagramEngine.installDefaultFactories();

    this.diagramEngine.registerPortFactory(
      new WidgetPortFactory(new WidgetPortModel())
    );
    this.diagramEngine.registerNodeFactory(new QueryNodeFactory());
    this.diagramEngine.registerNodeFactory(new FilterNodeFactory());
  }

  public componentDidMount() {
    const { match } = this.props;
    const dataViewId = match.params.id === "new" ? undefined : match.params.id;

    this.props.dispatchSessionRequest(dataViewId);
  }

  public componentDidUpdate(prevProps: Props) {
    const { match } = this.props;
    if (
      match.params.id !== "new" &&
      match.params.id !== prevProps.match.params.id
    ) {
      this.props.dispatchSessionRequest(match.params.id);
      return;
    }

    const currentSession = this.props.session;
    if (currentSession == null) {
      return;
    }

    const prevSession = prevProps.session;
    if (
      prevSession == null ||
      currentSession.SessionId !== prevSession.SessionId ||
      this.props.queries !== prevProps.queries
    ) {
      const activeModel = new DiagramModel();

      const queryNodes = Object.keys(this.props.queries).map(
        id => new QueryNodeModel(this.props.queries[id])
      );

      const filterNodes = Object.keys(this.props.filters).map(
        id => new FilterNodeModel(this.props.filters[id])
      );

      activeModel.addAll(...queryNodes);
      activeModel.addAll(...filterNodes);

      const links = [];
      for (const id of Object.keys(this.props.connections)) {
        const connection = this.props.connections[id];

        const nodeFrom = activeModel.getNode(
          connection.FromElementId.toString()
        );

        const nodeTo = activeModel.getNode(connection.ToElementId.toString());

        if (nodeFrom == null || nodeTo == null) {
          break;
        }

        const portFrom = nodeFrom.getPort("from") as WidgetPortModel;
        const portTo = nodeTo.getPort("to") as WidgetPortModel;

        const link = portFrom.link(portTo);

        links.push(link);
      }

      activeModel.addAll(...links);

      this.diagramEngine.setDiagramModel(activeModel);
      this.diagramEngine.repaintCanvas();
    }
  }

  public async componentWillUnmount() {
    const { session } = this.props;
    if (session == null) {
      return;
    }
    try {
      await destroySessionAsync(session.TenantId, session.SessionId);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.error(e);
    }
  }

  public render() {
    return (
      <LoadingContainer isLoading={this.props.isLoading}>
        <Workbench
          diagramEngine={this.diagramEngine}
          handleDragOver={this.handleDragOver}
          handleDrop={this.handleDrop}
        />
      </LoadingContainer>
    );
  }

  private handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  private handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const { graph, dispatchAddQuery } = this.props;
    if (graph == null) {
      throw new Error("Graph cannot be null.");
    }

    const operatorServiceId = event.dataTransfer.getData("ELEMENT");
    const points = this.diagramEngine.getRelativeMousePoint(event);

    switch (operatorServiceId) {
      case ElementType.QUERY:
        dispatchAddQuery(graph.NextElementId, points.x, points.y);
        break;
      default:
        break;
    }
  };
}

const mapStateToProps = ({ sessionGraph: { ...state } }: RootState) => state;

const mapDispatchToProps = (
  dispatch: Dispatch<SessionAction | QueryAction>
) => ({
  dispatchSessionRequest: (dataViewId?: string) => {
    dispatch(sessionRequest(dataViewId));
  },
  dispatchAddQuery: (elementId: number, x: number, y: number) =>
    dispatch(addQuery(elementId, x, y))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkbenchContainer);
