import React from "react";
import { DiagramEngine } from "../DiagramEngine";
import { LinkModel } from "../models/LinkModel";
import { BaseWidget, BaseWidgetProps } from "./BaseWidget";

export interface ILinkProps extends BaseWidgetProps {
  link: LinkModel;
  diagramEngine: DiagramEngine;
  children?: any;
}

/**
 * @author Dylan Vorster
 */
export class LinkWidget extends BaseWidget<ILinkProps, {}> {
  constructor(props: ILinkProps) {
    super("srd-link", props);
    this.state = {};
  }

  public shouldComponentUpdate() {
    return this.props.diagramEngine.canEntityRepaint(this.props.link);
  }

  public render() {
    return this.props.children;
  }
}
