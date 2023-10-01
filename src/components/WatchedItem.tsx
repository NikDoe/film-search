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