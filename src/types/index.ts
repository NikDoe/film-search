import { Dispatch, ReactNode, SetStateAction } from "react";

export type TempMovieDataType = {
	imdbID: string,
	Title: string,
	Year: string,
	Poster: string,
	Runtime: string,
	imdbRating: string,
	Plot: string,
	Released: string,
	Actors: string,
	Director: string,
	Genre: string,
};

export type TempWatchedDataType = {
    imdbID: string;
    title: string;
    poster: string;
    runtime: number;
    imdbRating: number;
    userRating: number;
}

//Movies CONTEXT
export type TMoviesState = {
	searchString: string,
	movies: TempMovieDataType[],
	isLoading: boolean,
	errorMessage: string | null,
	selectedMovieId: string | null,
}

export enum MoviesActionType {
	LOADING = 'loading',
	SEARCH_MOVIE = 'movies/searh',
	FETCH_MOVIES = 'movies/fetch',
	HANDLE_SELECTED_MOVIE = 'movie/select',
	REJECTED = 'rejected',
}

export type TMoviesAction = 
{ type: MoviesActionType.LOADING } |
{ type: MoviesActionType.SEARCH_MOVIE; payload: string } |
{ type: MoviesActionType.FETCH_MOVIES; payload: TempMovieDataType[] } |
{ type: MoviesActionType.HANDLE_SELECTED_MOVIE; payload: null | string } |
{ type: MoviesActionType.REJECTED; payload: string | null }

export interface TMovieContextValue extends TMoviesState {
	dispatch: Dispatch<TMoviesAction>,
}

//Watched CONTEXT
export type WatchedProviderProps = {
    children: ReactNode;
}

export type TWatchedState = {
	watched: TempWatchedDataType[],
	setWatched: Dispatch<SetStateAction<TempWatchedDataType[]>>
}