import { FC } from "react";
import { TempWatchedDataType } from "../App";
import Rating from "./Rating";
import Button from "./Button";

type WatchedItemProps = {
    movie: TempWatchedDataType;
	onDelete: (id: string) => void;
}

const WatchedItem: FC<WatchedItemProps> = function (props) {
	const {
		movie,
		onDelete
	} = props;

	const {
		imdbID,
		imdbRating,
		poster,
		title,
		runtime,
		userRating
	} = movie;
    
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
					handleClick={() => onDelete(imdbID)}
				>
				X
				</Button>
			</div>
		</li>
	);
};

export default WatchedItem;