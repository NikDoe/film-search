import { FC, ReactNode } from "react";
import BoxContainer from "./BoxContainer";

type MovieBoxProps = {
    children: ReactNode;
}

const MovieBox: FC<MovieBoxProps> = function ({ children }) {
	return (
		<BoxContainer>
			{children}
		</BoxContainer>
	);
};

export default MovieBox;