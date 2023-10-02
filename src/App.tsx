import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedList from "./components/WatchedList";
import Box from "./components/Box";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";

const OMDB_API_KEY = "ee463b02";

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

const App = function () {
	const [movies, setMovies] = useState<TempMovieDataType[]>([]);
	const [watched, setWatched] = useState<TempWatchedDataType[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<null | string>(null);
	const [query, setQuery] = useState("");
	const [selectedId, setSelectedId] = useState<string>("");
	

	const getErrorMessage = (error: unknown): string | null => {
		if (error instanceof Error) {
			if(error.name !== "AbortError") {
				return error.message;
			}

			return null;
		} else {
			return 'Произошла неизвестная ошибка';
		}
	};

	useEffect(() => {
		if(query.length < 2) {
			setMovies([]);
			setErrorMessage('');
			return;
		}

		const controller = new AbortController();

		const fetchMovies = async function () {
			try {
				setIsLoading(true);
				setErrorMessage(null);
	
				const response = await fetch(
					`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}`,
					{ signal: controller.signal }
				);
	
				const data = await response.json();
	
				if(data.Response === "False") throw new Error("по вашему запросу ничего не найдено");

				handleCloseMovieDetails();
				
				setMovies(data.Search);
				setErrorMessage(null);
			} catch (error) {
				const errorMessage = getErrorMessage(error);
				setErrorMessage(errorMessage);
			} finally {
				setIsLoading(false);
			}
		};

		fetchMovies();

		return () => {
			controller.abort();
		};
	}, [query]);

	const handleSelectedMovie = (id: string) => {
		setSelectedId(prevID => prevID === id ? "": id);
	};

	const handleCloseMovieDetails = () => {
		setSelectedId("");
	};

	const handleDeleteWatchedFilm = (id: string) => {
		setWatched(watched => watched.filter(film => film.imdbID !== id));
	};

	const movieListComponent = (
		<MovieList 
			movies={movies}
			onSelectMovie={handleSelectedMovie}
		/>
	);

	const errorMessageComponent = (
		<ErrorMessage message={errorMessage} />
	);

	const watchedListComponent = (
		<>
			<WatchedSummary watched={watched} />
			<WatchedList 
				watched={watched}
				onDelete={handleDeleteWatchedFilm}
			/>
		</>
	);

	const movieDetailsComponent = (
		<MovieDetails 
			selectedId={selectedId}
			onCloseMovie={handleCloseMovieDetails}
			watched={watched}
			setWatched={setWatched}
		/>
	);

	return (
		<>
			<Navbar>
				<Search
					query={query}
					setQuery={setQuery}
				/>
				<SearchResults moviesLength={movies.length} />
			</Navbar>
			<Main>
				<Box>
					{isLoading && <Loader />}
					{errorMessage && errorMessageComponent}
					{!isLoading && !errorMessage && movieListComponent }
				</Box>
				<Box>
					{selectedId ? movieDetailsComponent : watchedListComponent}
				</Box>
			</Main>
		</>
	);
};

export default App;
