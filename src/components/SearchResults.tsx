import { FC } from "react";
import { useMovies } from "../contexts/MovieContext";

const SearchResults: FC = function () {
	const { movies } = useMovies();

	return(
		<p className="num-results">
          Found <strong>{movies.length}</strong> results
		</p>
	);
};

export default SearchResults;