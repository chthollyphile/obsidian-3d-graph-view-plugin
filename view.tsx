import { ItemView, WorkspaceLeaf } from "obsidian";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Dgraph7c94cd } from "./ReactView";
import { createRoot } from "react-dom/client";
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';
export const VIEW_TYPE_OB3GV = "Obsidian-3D-Graph-Viewer";

export class Ob3gvView extends ItemView {
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_OB3GV;
  }

  getDisplayText() {
    return "3D Graph View";
  }

async onOpen() {
    const graphJson = Dgraph7c94cd()
    const root = createRoot(this.containerEl.children[1])
    root.render(
        <ForceGraph3D
        graphData={graphJson}
        nodeColor={() => '#b6bfc1db'}
        nodeResolution={8}
        linkColor={() => "#f5f5f5"}
        linkCurvature={0.8}
        linkCurveRotation={4}
        linkDirectionalArrowColor={"#ffffff"}
        linkDirectionalArrowLength={4}
        backgroundColor={'#202020'}
        nodeThreeObjectExtend={true}
        nodeThreeObject={node => {
        const sprite = new SpriteText(node.id);
        sprite.color = 'lightgrey';
        sprite.textHeight = 4;
        return sprite;
        }}
        // onNodeClick={handleClick}
    />
    )
  }

  async onClose() {
    ReactDOM.unmountComponentAtNode(this.containerEl);
  } 
}
