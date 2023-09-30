import { FC } from "react";
import { TempMovieDataType } from "../App";

type MovieItemProps = {
    movie: TempMovieDataType;
	onSelectMovie: (id: string) => void;
}

const MovieItem: FC<MovieItemProps> = function (props) {
	const {
		movie,
		onSelectMovie
	} = props;

	const { Title, Year, imdbID } = movie;
    
	return (
		<li onClick={() => onSelectMovie(imdbID)}>
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