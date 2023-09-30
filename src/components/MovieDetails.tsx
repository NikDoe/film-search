import { FC, useEffect, useState } from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";
import ErrorMessage from "./ErrorMessage";
import { TempMovieDataType } from "../App";

const OMDB_API_KEY = "ee463b02";

type MovieDetailsProps = {
	selectedId: null | string;
	onCloseMovie: () => void;
}

const MovieDetails: FC<MovieDetailsProps> = function (props) {
	const {
		selectedId,
		onCloseMovie
	} = props;

	const [movie, setMovie] = useState<TempMovieDataType>();
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<null | string>(null);

	const {
		Title: title,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie ?? {};

	useEffect(() => {
		async function getMovieDetails() {
			try {
				setIsLoading(true);
				setErrorMessage(null);
				const res = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${selectedId}`);
				const data = await res.json();
				
				if(data.Response === "False") throw new Error("Фильм не найден");
				
				setMovie(data);
			} catch (error) {
				if (error instanceof Error) {
					if (error instanceof TypeError) {
						setErrorMessage('при загрузке фильма произошла ошибка');
					} else {
						setErrorMessage(error.message);
					}
				} else {
					setErrorMessage('Произошла неизвестная ошибка');
				}
			} finally {
				setIsLoading(false);
			}
		}
		getMovieDetails();
	},[selectedId]);

	const movieDetailsCotent = (
		<>
			<header>
				<button className="btn-back" onClick={onCloseMovie}>
					&larr;
				</button>
				<img src={poster} alt={`Poster of ${movie} movie`} />
				<div className="details-overview">
					<h2>{title}</h2>
					<p>
						{released} &bull; {runtime}
					</p>
					<p>{genre}</p>
					<p>
						<span>⭐️</span>
						{imdbRating} IMDb rating
					</p>
				</div>
			</header>
			<section>
				<div className="rating">
					<StarRating
						maxRating={10}
						size={24}
					/>
				</div>
				<p>
					<em>{plot}</em>
				</p>
				<p>Starring {actors}</p>
				<p>Directed by {director}</p>
			</section>
		</>
	);
  
	return (
		<div className="details">
			{isLoading && <Loader />}
			{errorMessage && <ErrorMessage message={errorMessage} />}
			{movie && !isLoading && !errorMessage && movieDetailsCotent}
		</div>
	);
};

export default MovieDetails;