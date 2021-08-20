//this is for the proxy network image
import { Node } from "./Node";
import { ITreeNode, ITree } from "../../../Types/Types";
import { Tree, hierarchy } from '@visx/hierarchy';
import { Group } from '@visx/group';

const testTree: ITree = {
  parent: 'Parent Component',
  value: 'This is the value',
  children: [
    { name: 'Child Comp 1' },
    { name: 'Child Comp 2' },
  ]
}

const testNode: ITreeNode = {
  name: 'This is a node',
}

function ProxyNetwork() {
  return (
    <Group>
      <svg height='1000' width='1000'>
        <circle cx="800" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
        <text fill='#000000' fontSize={8} stroke='#ffffff' x={25} y={25}>
          {testTree.parent}
        </text>
        <text fill='#000000' fontSize={8} stroke='#ffffff' x={30} y={30}>
          {testTree.value}
        </text>
      </svg>
      <svg>
        {testTree.children?.map(node => (
          <Node node={node}></Node>
        ))}
      </svg>
    </Group>
  )
}

export default ProxyNetwork;