import { FC, useRef } from "react";
import { useKeyPress } from "../hooks/useKeyPress";

type SearchProps = {
	query: string;
	setQuery: (query: string) => void;
}

const Search: FC<SearchProps> = function (props) {
	const {
		query,
		setQuery
	} = props;

	const searchRef = useRef<null | HTMLInputElement>(null);

	useKeyPress('Enter', () => {
		if(searchRef.current && !searchRef.current.matches(":focus")) {
			setQuery("");
			searchRef.current.focus();
		}
	});

	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			ref={searchRef}
		/>
	);
};

export default Search;