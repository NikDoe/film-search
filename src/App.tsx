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

// const tempWatchedData = [
// 	{
// 		imdbID: "tt1375666",
// 		Title: "Inception",
// 		Year: "2010",
// 		Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
// 		runtime: 148,
// 		imdbRating: 8.8,
// 		userRating: 10,
// 	},
// 	{
// 		imdbID: "tt0088763",
// 		Title: "Back to the Future",
// 		Year: "1985",
// 		Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
// 		runtime: 116,
// 		imdbRating: 8.5,
// 		userRating: 9,
// 	},
// ];

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
	

	const getErrorMessage = (error: unknown): string => {
		if (error instanceof Error) {
			if (error instanceof TypeError) {
				return 'при загрузке фильмов произошла ошибка';
			} else {
				return error.message;
			}
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

		const fetchMovies = async function () {
			try {
				setIsLoading(true);
				setErrorMessage(null);
	
				const response = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}`);
	
				const data = await response.json();
	
				if(data.Response === "False") throw new Error("по вашему запросу ничего не найдено");
				
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
