import { useContext } from "react";
import { TWatchedState } from "../../types";
import { WatchedContext } from "./WatchedContext";

export function useWatchedMovies (): TWatchedState {
	const watchedContex = useContext(WatchedContext);

	if(watchedContex === undefined) {
		throw new Error('Use watched context outside Provider');
	}

	return watchedContex;
}