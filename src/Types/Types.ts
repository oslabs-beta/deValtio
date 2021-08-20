import { HierarchyPointNode } from '@visx/hierarchy/lib/types';



// interface for the hierarchical structure of state date
export interface ITree {
    name: string;
    children?: ITree[];
}

//export type HierarchyNode = HierarchyPointNode<ITree>;

// export interface ITreeNode {
//     name: string;
// }

