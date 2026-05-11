import React from "react";
import type { Context } from "./types";

export const TodoContext = React.createContext<Context | undefined>(undefined);

