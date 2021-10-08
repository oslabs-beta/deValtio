export type LinkTypesProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  proxyName?: string;
};

//Snapshot State(Proxy(s)) taken from DeValtio dev tool
export type Snapshot = {
  [key: string]: SnapshotValue;
};

//Individual snapshot object
export type SnapshotValue = {
  value: any;
  dependentOf: string[];
  dependents: string[];
  components: string[];
};

//Snapshot history for context API
export type SnapshotHistoryContext = {
  snapshotHistory: Snapshot[] | [];
  setSnapshotHistory?: React.Dispatch<React.SetStateAction<Snapshot[]>>;
};

//Snapshot index for context API
export type SnapshotIndexContext = {
  snapshotIndex: number;
  setSnapshotIndex?: React.Dispatch<React.SetStateAction<number>>;
};

//Component Tree taken from DeValtio dev tool
export type ComponentTree = {
  name: string;
  children: object[];
};

//Component tree history for context API
export type ComponentTreeHistoryContext = {
  componentTreeHistory: ComponentTree[] | [];
  setComponentTreeHistory?: React.Dispatch<
    React.SetStateAction<ComponentTree[]>
  >;
};

export interface IState {
  name: string;
  value: any;
}

export type ISnapShot = IState[] | undefined;

export type ISnapShotList = ISnapShot[];

export interface ISnapShotContext {
  snapShotIndex: number;
  setSnapShotIndex: React.Dispatch<React.SetStateAction<number>>;
}