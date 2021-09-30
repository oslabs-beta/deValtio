import { createContext } from "react";
import { 
  ISnapShotContext,
  Snapshot,
  SnapshotHistoryContext,
  SnapshotIndexContext,

} from "../../Types/Types";

export const SnapShotContext = createContext<ISnapShotContext | null>(null);

// contexts created for our state values to later reference in child components
export const snapshotHistoryContext = createContext<SnapshotHistoryContext>({
  snapshotHistory: [],
});
export const snapshotIndexContext = createContext<SnapshotIndexContext>({
  snapshotIndex: 0,
});