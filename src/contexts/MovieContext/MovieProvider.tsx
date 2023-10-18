import { ReactNode, useEffect, useReducer } from "react";
import { MovieContext, initialMoviesState } from "./MovieContext";
import { 
	MoviesActionType, 
	TMovieContextValue, 
	TMoviesAction, 
	TMoviesState 
} from "../../types";
import { getErrorMessage } from "../../utils";

type MovieProviderProps = {
    children: ReactNode;
}

function reducer (state: TMoviesState, action: TMoviesAction): TMoviesState {
	switch (action.type) {
	case MoviesActionType.LOADING:
		return {
			...state,
			isLoading: true,
			errorMessage: null,
		};

	case MoviesActionType.SEARCH_MOVIE:
		return {
			...state,
			searchString: action.payload,
		};

	case MoviesActionType.FETCH_MOVIES:
		return {
			...state,
			isLoading: false,
			errorMessage: null,
			movies: action.payload,
		};

	case MoviesActionType.HANDLE_SELECTED_MOVIE:
		return {
			...state,
			selectedMovieId: action.payload,
		};

	case MoviesActionType.REJECTED:
		return {
			...state,
			isLoading: false,
			errorMessage: action.payload,
		};
	
	default:
		return state;
	}
}

const OMDB_API_KEY = "ee463b02";

function MovieProvider({ children }: MovieProviderProps) {
	const [state, dispatch] = useReducer(reducer, initialMoviesState);
	const { 
		searchString,
		movies, 
		errorMessage, 
		isLoading,
		selectedMovieId
	} = state;

	useEffect(function(){		
		if(searchString.length <= 2) {
			dispatch({ type: MoviesActionType.FETCH_MOVIES, payload: [] });
			return;
		}

		const controller = new AbortController();
		
		async function fetchMovies(query: string) {
			dispatch({ type: MoviesActionType.LOADING });		
	
			try {
				const response = await fetch(
					`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}`,
					{ signal: controller.signal }
				);
	
				const data = await response.json();
				
	
				if(data.Response === "False") throw new Error("по вашему запросу ничего не найдено");
	
				dispatch({ type: MoviesActionType.FETCH_MOVIES, payload: data.Search });
			} catch (error) {
				const errorMessage = getErrorMessage(error);
				dispatch({ type: MoviesActionType.REJECTED, payload: errorMessage });
			}
		}

		fetchMovies(searchString);

		return () => {
			controller.abort();
		};
	}, [searchString]);
    
	const value: TMovieContextValue = {
		searchString,
		movies,
		isLoading,
		errorMessage,
		selectedMovieId,
		dispatch,
	};

	return (
		<MovieContext.Provider
			value={value}
		>
			{children}
		</MovieContext.Provider>
	);
}

export default MovieProvider;
