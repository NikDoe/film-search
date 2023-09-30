import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedList from "./components/WatchedList";
import Box from "./components/Box";
import StarRating from "./components/StarRating";
import TestComponent from "./components/TestComponent";

const tempMovieData = [
	{
		imdbID: "tt1375666",
		Title: "Inception",
		Year: "2010",
		Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
	},
	{
		imdbID: "tt0133093",
		Title: "The Matrix",
		Year: "1999",
		Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
	},
	{
		imdbID: "tt6751668",
		Title: "Parasite",
		Year: "2019",
		Poster:
		"https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
	},
];

const tempWatchedData = [
	{
		imdbID: "tt1375666",
		Title: "Inception",
		Year: "2010",
		Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
		runtime: 148,
		imdbRating: 8.8,
		userRating: 10,
	},
	{
		imdbID: "tt0088763",
		Title: "Back to the Future",
		Year: "1985",
		Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
		runtime: 116,
		imdbRating: 8.5,
		userRating: 9,
	},
];

const OMDB_API_KEY = "ee463b02";

export type TempMovieDataType = typeof tempMovieData[number];
export type TempWatchedDataType = typeof tempWatchedData[number];

const App = function () {
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState(tempWatchedData);

	const query = "lord";

	const fetchMovies = async function () {
		try {
			const response = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}`);
			const data = await response.json();
			setMovies(data.Search);
		} catch (error) {
			console.log("произошла ошибка при загрузке фильмов");
		}
	};

	useEffect(() => {
		fetchMovies();
	}, []);

	return (
		<>
			<Navbar>
				<Search />
				<SearchResults moviesLength={movies.length} />
			</Navbar>
			<Main>
				<Box>
					<MovieList movies={movies} />
				</Box>
				<Box>
					<WatchedSummary watched={watched} />
					<WatchedList watched={watched} />
				</Box>
			</Main>
		</>
	);
};

export default App;
