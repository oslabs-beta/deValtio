import { createContext } from "react";
import { RawDataContainer } from "../../Types/Types";

export const GlobalStateContext = createContext<RawDataContainer | []>([]);