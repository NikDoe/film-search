import { FC, ReactNode } from "react";

type ButtonProps = {
	children: ReactNode;
	className: string;
    handleClick: () => void;
}

const Button: FC<ButtonProps> = function (props) {
	const { 
		children,
		className,
		handleClick
	} = props;
    
	return (
		<button
			className={className}
			onClick={handleClick}
		>
			{children}
		</button>
	);
};

export default Button;