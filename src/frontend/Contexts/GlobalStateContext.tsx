import { createContext } from "react";
import { ISnapShotList } from "../../Types/Types";

export const GlobalStateContext = createContext<ISnapShotList | null>(null);