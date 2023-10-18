import { createContext } from "react";
import { TMovieContextValue, TMoviesState } from "../../types";

export const initialMoviesState: TMoviesState = {
	searchString: '',
	movies: [],
	isLoading: false,
	errorMessage: null,
	selectedMovieId: null,
};


const defaultValue: TMovieContextValue = {
	...initialMoviesState,
	dispatch: () => {},
};

export const MovieContext = createContext(defaultValue);