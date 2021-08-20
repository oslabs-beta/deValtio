import { Group } from '@visx/group';
import { HierarchyPointNode } from '@visx/hierarchy/lib/types';
import { ITreeNode } from '../../../Types/Types';



export const Node = ({ node }: { node: ITreeNode }) => {
    console.log(node);
    return (
        <Group top={100} left={100}>
            <svg height='50' width='100'>
                <rect
                    height='100'
                    width='100'
                    fill='#fe6e9e'
                >
                </rect>
                <text fill='#ffffff' fontSize={8} stroke='#ffffff' x={25} y={25}>
                    {node.name}
                </text>
            </svg>
        </Group>
    )
}