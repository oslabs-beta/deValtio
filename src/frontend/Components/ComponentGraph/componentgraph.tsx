import { useState, useContext, useEffect } from 'react';
import { GlobalStateContext } from "../../Contexts/GlobalStateContext";
import { SnapShotContext } from "../../Contexts/SnapShotContext";
import { Group } from '@visx/group';
import { Tree, hierarchy } from '@visx/hierarchy';
import { LinearGradient } from '@visx/gradient';
import { pointRadial } from 'd3-shape';
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';

import useForceUpdate from './useForceUpdate'
import LinkControls from './LinkControls';
import getLinkComponent from './getLinkComponent';
import {
  componentTreeHistoryContext,
  snapshotIndexContext,
  snapshotHistoryContext,
} from '../../Contexts/SnapShotContext';
import {
  LinkTypesProps,
  SnapshotHistoryContext,
  SnapshotIndexContext,
  RawData,
  TreeNode
} from '../../../Types/Types';
//import mockData from '../../MockData/data'

const paleCerulean = '#98C1D9';
const bedazzledBlue = '#3D5A80';
const lightCyan = '#E0FBFC';
const redMunsell = '#F02D44';
const salmonPink = '#F68E9A';
export const gunmetal = '#293241';

// interface TreeNode {
//   children?: TreeNode[];
//   hooks?: {};
//   key?: any;
//   name: string | null;
//   props?: any;
//   state?: any;
//   tag?: number;
//   isExpanded?: boolean;
// }

//const data: TreeNode = mockData;

const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };

function ComponentGraph({
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
}: LinkTypesProps) {

  const state = useContext(GlobalStateContext);
  const { snapShotIndex }: { snapShotIndex: number } = useContext<any>(SnapShotContext);
  console.log('from comp graph', state, snapShotIndex);

  const [layout, setLayout] = useState<string>('cartesian');
  const [orientation, setOrientation] = useState<string>('horizontal');
  const [linkType, setLinkType] = useState<string>('diagonal');
  const [stepPercent, setStepPercent] = useState<number>(0.5);
  const [stateSnapshot, setStateSnapshot] = useState<any>(state);
  const forceUpdate = useForceUpdate();

  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;

  useEffect(() => {
    setStateSnapshot(state[snapShotIndex]);
  }, [snapShotIndex]);

  console.log('from comp graph', state[0], state[1]);

  //Sets component tree data based on current snapshot selected
  // const data: TreeNode = stateSnapshot;

  let origin: { x: number; y: number };
  let sizeWidth: number;
  let sizeHeight: number;

  if (layout === 'polar') {
    origin = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    };
    sizeWidth = 2 * Math.PI;
    sizeHeight = Math.min(innerWidth, innerHeight) / 2;
  } else {
    origin = { x: 0, y: 0 };
    if (orientation === 'vertical') {
      sizeWidth = innerWidth;
      sizeHeight = innerHeight;
    } else {
      sizeWidth = innerHeight;
      sizeHeight = innerWidth;
    }
  }

  //Tooltip Hover Box
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  }: any = useTooltip();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
  });
  const tooltipStyleBox = {
    ...defaultStyles,
    minWidth: 60,
    backgroundColor: 'black',
    color: '#e6e6e6',
    fontSize: '13px',
    lineHeight: '18px',
  };

  const LinkComponent = getLinkComponent({ layout, linkType, orientation });

  return totalWidth < 10 ? null : (
    <div>
      <LinkControls
        layout={layout}
        orientation={orientation}
        linkType={linkType}
        stepPercent={stepPercent}
        setLayout={setLayout}
        setOrientation={setOrientation}
        setLinkType={setLinkType}
        setStepPercent={setStepPercent}
      />
      <svg width={totalWidth} height={totalHeight}>
        <LinearGradient id="links-gradient" from={salmonPink} to={redMunsell} />
        <rect width={totalWidth} height={totalHeight} rx={14} fill={gunmetal} />
        <Group top={margin.top} left={margin.left}>
          <Tree
            root={hierarchy(stateSnapshot, d => (d.isExpanded ? null : d.children))}
            size={[sizeWidth, sizeHeight]}
            separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}
          >
            {tree => (
              <Group top={origin.y} left={origin.x}>
                {tree.links().map((link, i) => (
                  <LinkComponent
                    key={i}
                    data={link}
                    percent={stepPercent}
                    stroke={salmonPink}
                    strokeWidth="1"
                    fill="none"
                  />
                ))}

                {tree.descendants().map((node, key) => {
                  const width = 40;
                  const height = 20;

                  let top: number;
                  let left: number;
                  if (layout === 'polar') {
                    const [radialX, radialY] = pointRadial(node.x, node.y);
                    top = radialY;
                    left = radialX;
                  } else if (orientation === 'vertical') {
                    top = node.y;
                    left = node.x;
                  } else {
                    top = node.x;
                    left = node.y;
                  }

                  //Tooltip Hover Box
                  const handleMouseOver = (event: any) => {
                    const coords: any = localPoint(
                      event.target.ownerSVGElement,
                      event
                    );
                    const tooltipObj = node.data;
                    showTooltip({
                      tooltipLeft: coords.x,
                      tooltipTop: coords.y,
                      tooltipData: tooltipObj,
                    });
                  };
                  const handleMouseOut = () => {
                    hideTooltip();
                  };

                  return (
                    <Group top={top} left={left} key={key}>
                      {/* ROOT NODE */}
                      {node.depth === 0 && (
                        <circle
                          r={12}
                          fill="url('#links-gradient')"
                          onClick={() => {
                            node.data.isExpanded = !node.data.isExpanded;
                            console.log(node);
                            forceUpdate();
                          }}
                        />
                      )}
                      {/* CHILD NODES */}
                      {node.depth !== 0 && (
                        <rect
                          height={height}
                          width={width}
                          y={-height / 2}
                          x={-width / 2}
                          fill={gunmetal}
                          stroke={node.data.children ? bedazzledBlue : paleCerulean}
                          strokeWidth={1}
                          strokeDasharray={node.data.children ? '0' : '2,2'}
                          strokeOpacity={node.data.children ? 1 : 0.6}
                          rx={node.data.children ? 0 : 10}
                          onClick={() => {
                            node.data.isExpanded = !node.data.isExpanded;
                            console.log(node);
                            forceUpdate();
                          }}
                          //Tooltip Methods
                          onMouseOver={handleMouseOver}
                          onMouseOut={handleMouseOut}
                        />
                      )}
                      <text
                        dy=".33em"
                        fontSize={9}
                        fontFamily="Arial"
                        textAnchor="middle"
                        style={{ pointerEvents: 'none' }}
                        fill={node.depth === 0 ? gunmetal : lightCyan}
                      >
                        {node.data.name}
                      </text>
                    </Group>
                  );
                })}
              </Group>
            )}
          </Tree>
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          // Setting the key to random here ensures that it correctly updates with parent bounds
          key={Math.random() * 1000000}
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyleBox}
        >
          {/* HOVER NAME */}
          <div>
            {tooltipData.name &&
              tooltipData.name[0] === tooltipData.name[0].toUpperCase() ? (
              <strong style={{ color: '#7f5dc0' }}>Component: </strong>
            ) : tooltipData.name ? (
              <strong style={{ color: '#1cb5c9' }}>Element: </strong>
            ) : (
              'No Component or Element'
            )}

            {tooltipData.name}
          </div>
          {/* HOVER CHILDREN DETAILS */}
          {tooltipData.children && tooltipData.children.length > 0 && (
            <div>
              <strong style={{ color: '#41b69c' }}>Children: </strong>
              {
                tooltipData.children.join(', ')
              }
            </div>
          )}
        </TooltipInPortal>
      )}
    </div>
  );
}

export default ComponentGraph;