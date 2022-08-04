import { ItemView, TAbstractFile, TFile, WorkspaceLeaf } from "obsidian";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';
import { Dgraph7c94cd } from "ReactView"
export const VIEW_TYPE_OB3GV = "Obsidian-3D-Graph-Viewer";
import { useWindowSize } from '@react-hook/window-size';
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
    const { useRef, useCallback, useState, useEffect } = React;
    const FocusGraph = () => {
      const graphJson = Dgraph7c94cd()
      const [refresh, setData] = useState(Dgraph7c94cd());

      useEffect(() => {
        // refresh graphJson when metadataCache changed
        this.registerEvent(this.app.metadataCache.on('changed', () => {
          const refresh = Dgraph7c94cd()
          // console.log('🐟 metadataCache changed!');
          setData(() => {
            const graphJson = refresh
            return graphJson
          });
        }))
      }, []);

      const [width, height] = useWindowSize();
      const fgRef = useRef();
      const handleClick = useCallback(node => {
        // Open markdown file when click
        const nodePath = node.path
        const dgNodefile: TFile = app.vault.getAbstractFileByPath(nodePath)
        app.workspace.getLeaf().openFile(dgNodefile);
        // Auto-focus center node
        // credit to vasturiano/react-force-graph/example/camera-auto-orbit
        const distance = 120;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
        fgRef.current.cameraPosition(
          { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
          node, // lookAt ({ x, y, z })
          1500  // ms transition duration
        );
      }, [fgRef]);

    useEffect(() => {

      this.registerEvent(this.app.workspace.on('file-open',() => {
        const currentFileName = app.workspace.getActiveFile()?.basename
        let currentNode
        for (let q = 0; q < graphJson.nodes.length; q++) {
          let node = graphJson.nodes[q]
          let nodeid = node.id
          if (nodeid == currentFileName) {
            currentNode = node
          }
        }
        const distance = 120;
        const distRatio = 1 + distance / Math.hypot(currentNode.x, currentNode.y, currentNode.z);
        fgRef.current.cameraPosition(
          { x: currentNode.x * distRatio, y: currentNode.y * distRatio, z: currentNode.z * distRatio },
          currentNode, // lookAt ({ x, y, z })
          1500  // ms transition duration
        );;
    }));
    }, []);

    //////////////////////////////// getActiveFile ////////////////////////////////

    return <ForceGraph3D
      width={width}
      height={height}
      ref={fgRef}
      graphData={graphJson}
      nodeLabel="id"
      nodeColor={() => '#b6bfc1db'}
      nodeResolution={8}
      // nodeAutoColorBy="group"  //TODO: colorize nodes
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

