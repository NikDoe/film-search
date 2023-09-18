import { FC } from "react";
import MovieBox from "./MovieBox";
import WatchedBox from "./WatchedBox";
import { TempMovieDataType, TempWatchedDataType } from "../App";

type MainProps = {
    movies: TempMovieDataType[];
    watched: TempWatchedDataType[];
}

const Main: FC<MainProps> = function ({ movies, watched }) {
	return (
		<main className="main">
			<MovieBox movies={movies} />
			<WatchedBox watched={watched} />
		</main>
	);
};

export default Main;