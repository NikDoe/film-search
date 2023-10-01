import { FC } from "react";
import { TempMovieDataType } from "../App";
import MovieItem from "./MovieItem";

type MovieListProps = {
    movies: TempMovieDataType[];
	onSelectMovie: (id: string) => void;
}

const MovieList: FC<MovieListProps> = function (props) {
	const {
		movies,
		onSelectMovie
	} = props;

	return (
		<ul className="list list-movies">
			{movies?.map((movie) => (
				<MovieItem 
					key={movie.imdbID}
					movie={movie}
					onSelectMovie={onSelectMovie}
				/>
			))}
		</ul>
	);
};

export default MovieList;