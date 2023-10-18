import { FC } from "react";
import { TempWatchedDataType } from "../types";
import { useWatchedMovies } from "../contexts/WatchedContex";

import Rating from "./Rating";
import Button from "./Button";

type WatchedItemProps = {
    movie: TempWatchedDataType;
}

const WatchedItem: FC<WatchedItemProps> = function ({ movie }) {
	const { setWatched } = useWatchedMovies();
	
	const {
		imdbID,
		imdbRating,
		poster,
		title,
		runtime,
		userRating
	} = movie;

	const handleDelete = (id: string) => {
		setWatched(watched => watched.filter(film => film.imdbID !== id));
	};
    
	return (
		<li>
			<img src={poster} alt={`${title} poster`} />
			<h3>{title}</h3>
			<div>
				<Rating 
					imdbRating={imdbRating}
					userRating={userRating} 
				/>
				<p>
					<span>⏳</span>
					<span>{runtime} min</span>
				</p>
				<Button 
					className="btn-delete"
					handleClick={() => handleDelete(imdbID)}
				>
				X
				</Button>
			</div>
		</li>
	);
};

export default WatchedItem;