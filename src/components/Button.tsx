import { FC } from "react";

type ButtonProps = {
    isOpen: boolean;
    handleClick: () => void;
}

const Button: FC<ButtonProps> = function (props) {
	const { isOpen, handleClick } = props;
    
	return (
		<button
			className="btn-toggle"
			onClick={handleClick}
		>
			{isOpen ? "–" : "+"}
		</button>
	);
};

export default Button;