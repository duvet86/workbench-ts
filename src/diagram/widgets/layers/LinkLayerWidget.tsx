import React from "react";
import { DiagramEngine } from "../../DiagramEngine";
import { LinkWidget } from "../LinkWidget";
import _ from "lodash";
import { PointModel } from "../../models/PointModel";
import { BaseWidget, BaseWidgetProps } from "../BaseWidget";

export interface ILinkLayerProps extends BaseWidgetProps {
  diagramEngine: DiagramEngine;
  pointAdded: (point: PointModel, event: MouseEvent) => any;
}

/**
 * @author Dylan Vorster
 */
export class LinkLayerWidget extends BaseWidget<ILinkLayerProps> {
  constructor(props: ILinkLayerProps) {
    super("srd-link-layer", props);
    this.state = {};
  }

  public render() {
    const diagramModel = this.props.diagramEngine.getDiagramModel();
    return (
      <svg
        {...this.getProps()}
        style={{
          transform:
            "translate(" +
            diagramModel.getOffsetX() +
            "px," +
            diagramModel.getOffsetY() +
            "px) scale(" +
            diagramModel.getZoomLevel() / 100.0 +
            ")"
        }}
      >
        {// Only perform these actions when we have a diagram.
        this.props.diagramEngine.canvas &&
          _.map(diagramModel.getLinks(), link => {
            if (
              this.props.diagramEngine.nodesRendered &&
              !this.props.diagramEngine.linksThatHaveInitiallyRendered[link.id]
            ) {
              if (link.sourcePort !== null) {
                try {
                  const portCenter = this.props.diagramEngine.getPortCenter(
                    link.sourcePort
                  );
                  link.points[0].updateLocation(portCenter);

                  const portCoords = this.props.diagramEngine.getPortCoords(
                    link.sourcePort
                  );
                  link.sourcePort.updateCoords(portCoords);

                  this.props.diagramEngine.linksThatHaveInitiallyRendered[
                    link.id
                  ] = true;
                } catch (ignore) {
                  /*noop*/
                }
              }
              if (link.targetPort !== null) {
                try {
                  const portCenter = this.props.diagramEngine.getPortCenter(
                    link.targetPort
                  );
                  _.last(link.points).updateLocation(portCenter);

                  const portCoords = this.props.diagramEngine.getPortCoords(
                    link.targetPort
                  );
                  link.targetPort.updateCoords(portCoords);

                  this.props.diagramEngine.linksThatHaveInitiallyRendered[
                    link.id
                  ] = true;
                } catch (ignore) {
                  /*noop*/
                }
              }
            }

            //generate links
            var generatedLink = this.props.diagramEngine.generateWidgetForLink(
              link
            );
            if (!generatedLink) {
              throw new Error(`no link generated for type: ${link.getType()}`);
            }

            return (
              <LinkWidget
                key={link.getID()}
                link={link}
                diagramEngine={this.props.diagramEngine}
              >
                {React.cloneElement(generatedLink, {
                  pointAdded: this.props.pointAdded
                })}
              </LinkWidget>
            );
          })}
      </svg>
    );
  }
}
