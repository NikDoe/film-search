import { FC } from "react";
import { TempWatchedDataType } from "../App";

type WatchedItemProps = {
    movie: TempWatchedDataType;
}

const WatchedItem: FC<WatchedItemProps> = function ({ movie }) {
	const {
		Poster,
		Title,
		imdbRating,
		userRating,
		runtime
	} = movie;
    
	return (
		<li>
			<img src={Poster} alt={`${Title} poster`} />
			<h3>{Title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span>{imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{runtime} min</span>
				</p>
			</div>
		</li>
	);
};

export default WatchedItem;