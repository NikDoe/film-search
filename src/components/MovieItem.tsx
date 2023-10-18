import { FC } from "react";
import { MoviesActionType, TempMovieDataType } from "../types";
import { useMovies } from "../contexts/MovieContext";

type MovieItemProps = {
    movie: TempMovieDataType;
}

const MovieItem: FC<MovieItemProps> = function ({ movie }) {
	const { dispatch } = useMovies();

	const { Title, Year, imdbID } = movie;

	function handleClick () {
		dispatch({
			type: MoviesActionType.HANDLE_SELECTED_MOVIE, 
			payload: imdbID,
		});
	}
    
	return (
		<li onClick={handleClick}>
			<img src={movie.Poster} alt={`${Title} poster`} />
			<h3>{Title}</h3>
			<div>
				<p>
					<span>🗓</span>
					<span>{Year}</span>
				</p>
			</div>
		</li>
	);
};

export default MovieItem;