import { FC } from "react";

type SearchResultsProps = {
    moviesLength: number;
}

const SearchResults: FC<SearchResultsProps> = function ({ moviesLength }) {
	return(
		<p className="num-results">
          Found <strong>{moviesLength}</strong> results
		</p>
	);
};

export default SearchResults;