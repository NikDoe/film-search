import { FC } from "react";
import { TempWatchedDataType } from "../App";
import Rating from "./Rating";

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
				<Rating 
					imdbRating={imdbRating}
					userRating={userRating} 
				/>
				<p>
					<span>⏳</span>
					<span>{runtime} min</span>
				</p>
			</div>
		</li>
	);
};

export default WatchedItem;