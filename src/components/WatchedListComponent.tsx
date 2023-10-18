import { useMovies } from "../contexts/MovieContext";

import Box from "./Box";
import MovieDetails from "./MovieDetails";
import WatchedList from "./WatchedList";
import WatchedSummary from "./WatchedSummary";

function WatchedListComponent() {
	const { selectedMovieId } = useMovies();

	const list = (
		<>
			<WatchedSummary />
			<WatchedList />
		</>
	);
	return (
		<Box>
			{selectedMovieId ? <MovieDetails /> : list }
		</Box>
	);
}

export default WatchedListComponent;
