import { FC } from "react";

import MovieslistComponent from "./MovieslistComponent";
import WatchedListComponent from "./WatchedListComponent";

const Main: FC = function () {		
	return (
		<main className="main">
			<MovieslistComponent />
			<WatchedListComponent />
		</main>
	);
};

export default Main;