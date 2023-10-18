import { useContext } from "react";
import { TMovieContextValue } from "../../types";
import { MovieContext } from "./MovieContext";

export function useMovies(): TMovieContextValue {
	const movieContext = useContext(MovieContext);

	if(movieContext === undefined) {
		throw new Error('Use movie context outside Provider');
	}

	return movieContext;
}