import { FC } from "react";
import Logo from "./Logo";
import Search from "./Search";
import SearchResults from "./SearchResults";

type NavbarProps = {
	moviesLength: number;
}

const Navbar: FC<NavbarProps> = function ({ moviesLength }) {
	return (
		<nav className="nav-bar">
			<Logo />
			<Search />
			<SearchResults moviesLength={moviesLength} />
		</nav>
	);
};

export default Navbar;