import { CSSProperties, FC, useState } from "react";
import Star from "./Star";

const containerStyles: CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: "16px",
};

const starArrayStyles: CSSProperties = {
	display: "flex",
};

type StarRatingProps = {
	size?: number;
	color?: string;
    maxRating?: number;
	onSetRating?: (rating: number) => void;
}

const StarRating: FC<StarRatingProps> = function (props) {
	const {
		size = 24,
		color = "#fcc419",
		maxRating = 5,
		onSetRating
	} = props;

	const textStyles: CSSProperties = {
		color,
		fontSize: `${size / 2}px`
	};

	const [clickRating, setClickRating] = useState(0);
	const [hoverRating, setHoverRating] = useState(0);

	const handleRating = (rating: number) => {
		setClickRating(rating);
		onSetRating && onSetRating(rating);
	};
    
	const starsArray = Array.from({ length: maxRating }, (_, i) => 
		<Star
			key={i}
			size={size}
			color={color}
			fill={hoverRating ? hoverRating >= i + 1 : clickRating >= i + 1}
			onRate={() => handleRating(i + 1)}
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