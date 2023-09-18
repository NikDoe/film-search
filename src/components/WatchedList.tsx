import { FC } from "react";
import { TempWatchedDataType } from "../App";
import WatchedItem from "./WatchedItem";

type WatchedListProps = {
    watched: TempWatchedDataType[];
}

const WatchedList: FC<WatchedListProps> = function ({ watched }) {
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