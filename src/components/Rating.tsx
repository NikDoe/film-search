import { FC } from "react";

type RatingProps = {
    imdbRating: number;
    userRating: number;
}

const Rating: FC<RatingProps> = function (props) {
	const {
		imdbRating,
		userRating
	} = props;

	return (
		<>
			<p>
				<span>⭐️</span>
				<span>{imdbRating.toFixed(1)}</span>
			</p>
			<p>
				<span>🌟</span>
				<span>{userRating.toFixed(1)}</span>
			</p>
		</>
	);
};

export default Rating;