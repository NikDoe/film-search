import { MovieProvider } from "./contexts/MovieContext";
import { WatchedProvider } from "./contexts/WatchedContex";

import Navbar from "./components/Navbar";
import Main from "./components/Main";

const App = function () {
	return (
		<MovieProvider>
			<WatchedProvider>
				<Navbar />
				<Main />
			</WatchedProvider>
		</MovieProvider>
	);
};

export default App;
