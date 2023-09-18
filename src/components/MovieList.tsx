import { FC } from "react";
import { TempMovieDataType, TempWatchedDataType } from "../App";
import MovieItem from "./MovieItem";

type MovieListProps = {
    movies: TempMovieDataType[] | TempWatchedDataType[];
}

const MovieList: FC<MovieListProps> = function ({ movies }) {
	return (
		<ul className="list">
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