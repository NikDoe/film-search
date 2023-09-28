import { CSSProperties, FC, useState } from "react";
import Star from "./Star";

const containerStyles: CSSProperties = {
	display: "flex",
	alignItems: "center",
	fontSize: "16px",
	gap: "16px",
};

const starArrayStyles: CSSProperties = {
	display: "flex",
	gap: "4px",
};

const textStyles: CSSProperties = {
	color: "yellowgreen"
};

type StarRatingProps = {
    maxRating?: number;
}

const StarRating: FC<StarRatingProps> = function (props) {
	const { maxRating = 5 } = props;

	const [rating, setRating] = useState(0);
    
	const starsArray = Array.from({ length: maxRating }, (_, i) => 
		<Star
			isClick={rating >= i + 1}
			onRate={() => setRating(i + 1)} 
		/>
	);

	return (
		<div style={containerStyles}>
			<div style={starArrayStyles}>
				{starsArray}
			</div>
			<p style={textStyles}>
				{rating}
			</p>
		</div>
	);
};

export default StarRating;