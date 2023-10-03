import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";
import ErrorMessage from "./ErrorMessage";
import { TempMovieDataType, TempWatchedDataType } from "../App";
import Button from "./Button";

const OMDB_API_KEY = "ee463b02";

type MovieDetailsProps = {
	selectedId: string;
	onCloseMovie: () => void;
	watched: TempWatchedDataType[];
	setWatched: Dispatch<SetStateAction<TempWatchedDataType[]>>;
}

const MovieDetails: FC<MovieDetailsProps> = function (props) {
	const {
		selectedId,
		onCloseMovie,
		watched,
		setWatched
	} = props;

	const [movie, setMovie] = useState<TempMovieDataType | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<null | string>(null);
	const [userRating, setUserRating] = useState<number>(0);

	const {
		imdbID = "",
		Title: title = "",
		Poster: poster = "",
		Runtime: runtime = "",
		imdbRating = "",
		Plot: plot = "",
		Released: released = "",
		Actors: actors = "",
		Director: director = "",
		Genre: genre = "",
	} = movie || {};

	const handleAddNewWatched = () => {
		if(!movie) return;

		const newWatchedFilm: TempWatchedDataType = {
			imdbID,
			imdbRating: Number(imdbRating),
			poster,
			runtime: parseInt(runtime),
			title,
			userRating,
		};

		setWatched((currState) => [...currState, newWatchedFilm]);
		onCloseMovie();
	};

	const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
	const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;

	useEffect(() => {
		const closeOnPressEscape = (event: KeyboardEvent) => {
			if(event.code === "Escape") {
				onCloseMovie();
			}
		};

		window.addEventListener("keydown", closeOnPressEscape);

		return () => {
			window.removeEventListener("keydown", closeOnPressEscape);
		};
	}, [onCloseMovie]);

	useEffect(() => {
		if(!title) return;

		document.title = `Movie | ${title}`;

		return () => {
			document.title = "search films";
		};
	}, [title]);

	useEffect(() => {
		const controller = new AbortController();

		async function getMovieDetails() {
			try {
				setIsLoading(true);
				setErrorMessage(null);
				const res = await fetch(
					`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${selectedId}`,
					{ signal : controller.signal }
				);

				const data = await res.json();				
				
				if(data.Response === "False") throw new Error("Фильм не найден");
				
				setMovie(data);
			} catch (error) {
				if (error instanceof Error) {
					if(error.name !== "AbortError") {
						setErrorMessage(error.message);
					}

					setMovie(null);
					setErrorMessage(null);
				} else {
					setErrorMessage('Произошла неизвестная ошибка');
				}
			} finally {
				setIsLoading(false);
			}
		}
		getMovieDetails();

		return () => {
			controller.abort();
		};
	},[selectedId]);

	const buttonContent = (
		<Button 
			className="btn-add"
			handleClick={handleAddNewWatched}
		>
			+ Add to list
		</Button>
	);

	const contentBeforeRate = (
		<>
			<StarRating
				maxRating={10}
				size={24}
				onSetRating={setUserRating}
			/>
			{userRating > 0 && buttonContent}
		</>
	);

	const contentAfterRate = <p>You rated with movie {watchedUserRating} <span>⭐️</span></p>;

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
					{isWatched ? contentAfterRate : contentBeforeRate}
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
			{!movie && !errorMessage && <Loader />}
			{errorMessage && <ErrorMessage message={errorMessage} />}
			{movie && !isLoading && !errorMessage && movieDetailsCotent}
		</div>
	);
};

export default MovieDetails;