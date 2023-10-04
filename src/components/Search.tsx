import { FC, useEffect, useRef } from "react";

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

	useEffect(() => {
		const focusOnPressEnter = (event: KeyboardEvent) => {
			if(
				event.code === "Enter" &&
				searchRef.current &&
				!searchRef.current.matches(":focus")
			) {
				setQuery("");
				searchRef.current.focus();
			}
		};

		window.addEventListener('keydown', focusOnPressEnter);

		return () => {
			window.removeEventListener('keydown', focusOnPressEnter);
		};
	}, [setQuery]);

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