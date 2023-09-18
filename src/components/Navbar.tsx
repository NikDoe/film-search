import { FC, ReactNode } from "react";
import Logo from "./Logo";

type NavbarProps = {
	children: ReactNode;
}

const Navbar: FC<NavbarProps> = function ({ children }) {
	return (
		<nav className="nav-bar">
			<Logo />
			{children}
		</nav>
	);
};

export default Navbar;