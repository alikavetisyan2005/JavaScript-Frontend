import React from "react";
import type { UserContext } from "./types";

export const Context = React.createContext<UserContext | undefined>(undefined);

