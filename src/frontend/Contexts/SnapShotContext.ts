import { createContext } from "react";
import { ISnapShotContext } from "../../Types/Types";

export const SnapShotContext = createContext<ISnapShotContext | null>(null);
