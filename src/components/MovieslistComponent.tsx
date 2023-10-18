import { useMovies } from "../contexts/MovieContext";

import Box from "./Box";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import MovieList from "./MovieList";

function MovieslistComponent() {
	const { isLoading, errorMessage } = useMovies();
	
	return (
		<Box>
			{isLoading && <Loader />}
			{errorMessage && <ErrorMessage message={errorMessage} />}
			{!isLoading && !errorMessage && <MovieList /> }
		</Box>
	);
}

export default MovieslistComponent;
