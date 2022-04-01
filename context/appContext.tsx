import { createContext } from "react";
import { AppContextInterface } from "../typings";

const appContext = createContext<AppContextInterface | null>(null);

export default appContext;
