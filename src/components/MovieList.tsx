import { FC } from "react";
import { useMovies } from "../contexts/MovieContext";

import MovieItem from "./MovieItem";

const MovieList: FC = function () {
	const { movies } = useMovies();

	return (
		<ul className="list list-movies">
			{movies?.map((movie) => (
				<MovieItem 
					key={movie.imdbID}
					movie={movie}
				/>
			))}
		</ul>
	);
};

export default MovieList;