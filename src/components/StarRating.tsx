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
};

const textStyles: CSSProperties = {
	color: "yellowgreen"
};

type StarRatingProps = {
    maxRating?: number;
}

const StarRating: FC<StarRatingProps> = function (props) {
	const { maxRating = 5 } = props;

	const [clickRating, setClickRating] = useState(0);
	const [hoverRating, setHoverRating] = useState(0);
    
	const starsArray = Array.from({ length: maxRating }, (_, i) => 
		<Star
			fill={hoverRating ? hoverRating >= i + 1 : clickRating >= i + 1}
			onRate={() => setClickRating(i + 1)}
			onHoverIn={() => setHoverRating(i + 1)}
			onHoverOut={() => setHoverRating(0)}
		/>
	);

	return (
		<div style={containerStyles}>
			<div style={starArrayStyles}>
				{starsArray}
			</div>
			<p style={textStyles}>
				{hoverRating || clickRating || ""}
			</p>
		</div>
	);
};

export default StarRating;