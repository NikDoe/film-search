import { FC } from "react";
import { useWatchedMovies } from "../contexts/WatchedContex";

import WatchedItem from "./WatchedItem";

const WatchedList: FC = function () {
	const { watched } = useWatchedMovies();
	
	return (
		<ul className="list">
			{watched.map((movie) => (
				<WatchedItem
					key={movie.imdbID}
					movie={movie}
				/>
			))}
		</ul>
	);
};

export default WatchedList;