import { FC, useRef } from "react";
import { useKeyPress } from "../hooks/useKeyPress";
import { useMovies } from "../contexts/MovieContext";
import { MoviesActionType } from "../types";

const Search: FC = function () {
	const searchRef = useRef<null | HTMLInputElement>(null);
	const { searchString, dispatch } = useMovies();

	useKeyPress('Enter', () => {
		if(searchRef.current && !searchRef.current.matches(":focus")) {
			dispatch({ type: MoviesActionType.SEARCH_MOVIE, payload: '' });
			searchRef.current.focus();
		}
	});

	function hanldeChange (value: string) {
		dispatch({ type: MoviesActionType.SEARCH_MOVIE, payload: value });
	}

	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={searchString}
			onChange={(e) => hanldeChange(e.target.value)}
			ref={searchRef}
		/>
	);
};

export default Search;