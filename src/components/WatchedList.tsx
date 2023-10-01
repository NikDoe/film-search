import { FC } from "react";
import { TempWatchedDataType } from "../App";
import WatchedItem from "./WatchedItem";

type WatchedListProps = {
    watched: TempWatchedDataType[];
	onDelete: (id: string) => void;
}

const WatchedList: FC<WatchedListProps> = function (props) {
	const {
		watched,
		onDelete
	} = props;

	return (
		<ul className="list">
			{watched.map((movie) => (
				<WatchedItem
					key={movie.imdbID}
					movie={movie}
					onDelete={onDelete}
				/>
			))}
		</ul>
	);
};

export default WatchedList;