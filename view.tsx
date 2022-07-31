import { ItemView, TAbstractFile, TFile, WorkspaceLeaf } from "obsidian";
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
    const { useRef, useCallback } = React;
    const graphJson = Dgraph7c94cd()
      const FocusGraph = () => {
        const fgRef = useRef();
        const handleClick = useCallback(node => {
          // Open markdown file when click

          const nodePath = node.path
          const dgNodefile: TFile = app.vault.getAbstractFileByPath(nodePath)
          app.workspace.getLeaf().openFile(dgNodefile);

          // Aim at node from outside it

          const distance = 200;
          const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
          fgRef.current.cameraPosition(
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
            node, // lookAt ({ x, y, z })
            1500  // ms transition duration
          );
        }, [fgRef]);

        return <ForceGraph3D
          ref={fgRef}
          graphData={graphJson}
          nodeLabel="id"
          nodeColor={() => '#b6bfc1db'}
          nodeResolution={8}
          nodeAutoColorBy="group"

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

          onNodeClick={handleClick}
        />;
      };
    const root = createRoot(this.containerEl.children[1])
    root.render( 
        <FocusGraph />
      );
  }

  async onClose() {
    ReactDOM.unmountComponentAtNode(this.containerEl);
  } 
}
