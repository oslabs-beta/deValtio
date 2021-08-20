// interface for the hierarchical structure of state date
export interface ITree {
    parent: string | null;
    value: any;
    children?: ITreeNode[]
}

export interface ITreeNode {
    name: string;
}

