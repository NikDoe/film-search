import { FC } from "react";
import { TempMovieDataType } from "../App";
import BoxContainer from "./BoxContainer";
import List from "./MovieList";

type MovieBoxProps = {
    movies: TempMovieDataType[];
}

const MovieBox: FC<MovieBoxProps> = function ({ movies }) {
	return (
		<BoxContainer>
			<List movies={movies} />
		</BoxContainer>
	);
};

export default MovieBox;