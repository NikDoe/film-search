import { FC } from "react";

type SearchProps = {
	query: string;
	setQuery: (query: string) => void;
}

const Search: FC<SearchProps> = function (props) {
	const {
		query,
		setQuery
	} = props;

	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
		/>
	);
};

export default Search;