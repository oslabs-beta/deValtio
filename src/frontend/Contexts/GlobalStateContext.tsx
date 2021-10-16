import { createContext } from "react";
import { RawDataContainer, TreeNode } from "../../Types/Types";

export const GlobalStateContext = createContext<TreeNode[] | []>([]);