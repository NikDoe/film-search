import { createContext } from "react";
import { TWatchedState } from "../../types";

const defaultValue: TWatchedState = {
	watched: [],
	setWatched: () => {}
};

export const WatchedContext = createContext(defaultValue);