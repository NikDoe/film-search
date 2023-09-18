import { FC } from "react";
import { TempMovieDataType } from "../App";

type MovieItemProps = {
    movie: TempMovieDataType;
}

const MovieItem: FC<MovieItemProps> = function ({ movie }) {
	const { Title, Year } = movie;
    
	return (
		<li>
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