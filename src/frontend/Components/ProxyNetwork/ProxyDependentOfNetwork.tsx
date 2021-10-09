import React, { useContext } from 'react';
import { Group } from '@visx/group';
import { hierarchy, Tree } from '@visx/hierarchy';
import { LinearGradient } from '@visx/gradient';
import { Zoom } from '@visx/zoom';
import { pointRadial } from 'd3-shape';

import getLinkComponent from '../ComponentGraph/getLinkComponent';
import { snapshotHistoryContext, snapshotIndexContext } from '../../Contexts/SnapShotContext';
import {
  SnapshotValue,
  LinkTypesProps,
  SnapshotHistoryContext,
  SnapshotIndexContext,
} from '../../../Types/Types';

import proxyData from '../../MockData/proxyData'

const initialTransform = {
  scaleX: 0.8,
  scaleY: 0.8,
  translateX: 20,
  translateY: 50,
  skewX: 0,
  skewY: 0,
};

const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };

function ProxyDependentOfNetwork({
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
  proxyName,
}: LinkTypesProps): JSX.Element | null {
  // const { snapshotHistory } = useContext<SnapshotHistoryContext>(
  //   snapshotHistoryContext
  // );
  // const { snapshotIndex } = useContext<SnapshotIndexContext>(
  //   snapshotIndexContext
  // );

  //Array of proxy state names in current snapshot
  const proxyNamesArray = Object.keys(proxyData);
  // const proxyNamesArray = Object.keys(snapshotHistory[snapshotIndex]);

  //Function creates dependent-of object for proxy network based on proxy item selected from drop down:
  function ProxyDependentOf(proxy: string | undefined) {
    const proxyDependentOfData: any = {};
    let object: SnapshotValue;
    if (!proxy) return;
    // if (!snapshotHistory[snapshotIndex][proxy]) {
    if (!proxyData[proxy]) {
      // object = snapshotHistory[snapshotIndex][proxyNamesArray[0]];
      object = proxyData[proxyNamesArray[0]];
      proxyDependentOfData.name = proxyNamesArray[0];
    } else {
      // object = snapshotHistory[snapshotIndex][proxy];
      object = proxyData[proxy];
      proxyDependentOfData.name = proxy;
    }
    proxyDependentOfData.nodeDeps = [];
    object.dependentOf.map((item: string) => {
      proxyDependentOfData.nodeDeps.push({ name: item });
    });
    return proxyDependentOfData;
  }

  const data = ProxyDependentOf(proxyName);

  const layout = 'polar';
  const linkType = 'line';

  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;

  let origin: { x: number; y: number };
  let sizeWidth: number;
  let sizeHeight: number;
  origin = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };
  sizeWidth = 2 * Math.PI;
  sizeHeight = Math.min(innerWidth, innerHeight) / 2;

  const LinkComponent = getLinkComponent({ layout, linkType });

  return totalWidth < 10 ? null : (
    <div>
      <Zoom
        width={totalWidth}
        height={totalHeight}
        scaleXMin={1 / 2}
        scaleXMax={4}
        scaleYMin={1 / 2}
        scaleYMax={4}
        initialTransformMatrix={initialTransform}
      >
        {zoom => (
          <svg width={totalWidth} height={totalHeight}>
            <LinearGradient id="proxy-gradient" from="#F68E9A" to="#F02D44" />
            <LinearGradient
              id="dependent-gradient"
              from="#98C1D9"
              to="#3D5A80"
            />
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX={40}
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#7c7c7c" />
              </marker>
            </defs>
            ;
            <rect
              width={totalWidth}
              height={totalHeight}
              rx={14}
              fill="#293241"
            />
            <g transform={zoom.toString()}>
              <Group top={margin.top} left={margin.left}>
                <Tree
                  root={hierarchy(data, d =>
                    d.isExpanded ? null : d.nodeDeps
                  )}
                  size={[sizeWidth, sizeHeight]}
                  separation={(a, b) =>
                    (a.parent === b.parent ? 0.55 : 0.5) / a.depth
                  }
                >
                  {tree => (
                    <Group top={origin.y} left={origin.x}>
                      {tree.links().map((link, i) => (
                        <LinkComponent
                          key={i}
                          data={link}
                          stroke="#7c7c7c"
                          strokeWidth="3"
                          fill="none"
                          markerStart="url(#arrow)"
                        />
                      ))}

                      {tree.descendants().map((node, key) => {
                        let top: number;
                        let left: number;

                        const [radialX, radialY] = pointRadial(node.x, node.y);
                        top = radialY;
                        left = radialX;

                        const fontSizeFunc = (name: string) => {
                          const nodeLength = name.length;
                          if (nodeLength < 5) return 19;
                          if (nodeLength < 10) return 18;
                          if (nodeLength < 15) return 16;
                          if (nodeLength < 20) return 12;
                          if (nodeLength < 25) return 11;
                          if (nodeLength < 30) return 10;
                          if (nodeLength < 35) return 7;
                          return 6;
                        };
                        const fontSize = fontSizeFunc(node.data.name);

                        return (
                          <Group top={top} left={left} key={key}>
                            {node.depth === 0 && (
                              <circle fill="url('#proxy-gradient')" r={65} />
                            )}
                            {node.depth !== 0 && (
                              <circle
                                r={65}
                                fill={"url('#dependent-gradient')"}
                              />
                            )}
                            <text
                              dy=".33em"
                              fontSize={fontSize}
                              fontFamily="Arial"
                              textAnchor="middle"
                              style={{
                                pointerEvents: 'none',
                                fontWeight: 'bold',
                              }}
                              fill={'#e6e6e6'}
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
            </g>
            <rect
              width={totalWidth}
              height={totalHeight}
              rx={14}
              fill="transparent"
              onTouchStart={zoom.dragStart}
              onTouchMove={zoom.dragMove}
              onTouchEnd={zoom.dragEnd}
              onMouseDown={zoom.dragStart}
              onMouseMove={zoom.dragMove}
              onMouseUp={zoom.dragEnd}
              onMouseLeave={() => {
                if (zoom.isDragging) zoom.dragEnd();
              }}
            />
          </svg>
        )}
      </Zoom>
    </div>
  );
}

export default ProxyDependentOfNetwork;
