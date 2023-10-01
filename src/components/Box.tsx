import { FC, ReactNode, useState } from "react";
import Button from "./Button";

type BoxProps = {
    children: ReactNode | ReactNode[];
}

const Box: FC<BoxProps> = function ({ children }) {
	const [isOpen, setIsOpen] = useState(true);

	return(
		<div className="box">
			<Button 
				className="btn-toggle"
				handleClick={() => setIsOpen(open => !open)}
			>
				{isOpen ? "–" : "+"}
			</Button>
			{isOpen && children}
		</div>
	);
};

export default Box;