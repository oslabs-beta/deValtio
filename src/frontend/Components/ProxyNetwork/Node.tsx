import { Group } from '@visx/group';
import { HierarchyNode } from '../../../Types/Types';



export const Node = ({ node }: { node: HierarchyNode }) => {
    const width = 40;
    const height = 20;
    const centerX = -width / 2;
    const centerY = -height / 2;
    console.log(node);
    return (
        <Group top={node.x} left={node.y}>
            <rect
                height={height}
                width={width}
                y={centerY}
                x={centerX}
                fill='black'
            >
            </rect>
        </Group>
    )
}