import { FC } from "react";
import { TempWatchedDataType } from "../App";
import Rating from "./Rating";

type WatchedSummaryProps = {
    watched: TempWatchedDataType[];
}

const average = (arr: number[]) =>
	arr.reduce((acc, cur, _, arr) => acc + cur / arr.length, 0);

const WatchedSummary: FC<WatchedSummaryProps> = function ({ watched }) {
	const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
	const avgUserRating = average(watched.map((movie) => movie.userRating));
	const avgRuntime = average(watched.map((movie) => movie.runtime));
    
	return (
		<div className="summary">
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watched.length} mov</span>
				</p>
				<Rating 
					imdbRating={avgImdbRating} 
					userRating={avgUserRating} 
				/>
				<p>
					<span>⏳</span>
					<span>{avgRuntime.toFixed(0)} min</span>
				</p>
			</div>
		</div>
	);
};

export default WatchedSummary;