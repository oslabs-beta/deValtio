import { useMemo } from 'react';
//this is for the proxy network image
import { Node } from "./Node";
//import { ITree, HierarchyNode } from "../../../Types/Types";
import { Tree, hierarchy } from '@visx/hierarchy';
import { Group } from '@visx/group';
import { LinkHorizontal } from '@visx/shape';
import { LinearGradient } from '@visx/gradient';
import { HierarchyPointNode } from '@visx/hierarchy/lib/types';



// interface for the hierarchical structure of state date
export interface ITree {
  name: string;
  value?: any;
  children?: this[]
}

export type HierarchyNode = HierarchyPointNode<ITree>;


const testTree: ITree = {
  name: 'Parent Component',
  children: [
    { name: 'Child Comp 1' },
    { name: 'Child Comp 2' },
  ]
}

const defaultMargin = { top: 10, left: 80, right: 80, bottom: 10 };

export type TreeProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

function ProxyNetwork({ width, height, margin = defaultMargin }: TreeProps) {
  const data = useMemo(() => hierarchy(testTree), []);
  const yMax = height - margin.top - margin.bottom;
  const xMax = width - margin.left - margin.right;

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <LinearGradient id="lg" from='white' to='black' />
      <rect width={width} height={height} rx={14} fill='black' />
      <Tree<ITree> root={data} size={[yMax, xMax]}>
        {tree => (
          <Group top={margin.top} left={margin.left}>
            {tree.links().map((link, i) => (
              <LinkHorizontal
                key={`link-${i}`}
                data={link}
                stroke='black'
                strokeWidth="1"
                fill="none"
              />
            ))}
            {tree.descendants().map((node, i) => (
              <Node key={`node-${i}`} node={node} />
            ))}
          </Group>
        )}
      </Tree>
    </svg>
  );
}

export default ProxyNetwork;