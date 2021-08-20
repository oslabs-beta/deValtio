import { HierarchyPointNode } from '@visx/hierarchy/lib/types';



// interface for the hierarchical structure of state date
export interface ITree {
    name: string;
    value?: any;
    children?: this[]
}

export type HierarchyNode = HierarchyPointNode<ITree>;

// export interface ITreeNode {
//     name: string;
// }

