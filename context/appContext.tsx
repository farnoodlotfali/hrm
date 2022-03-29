import { createContext } from "react";
import { AppContextInterface, User } from "../typings";

const appContext = createContext<AppContextInterface | null>(null);

export default appContext;
