import { FC, ReactNode, useState } from "react";
import Button from "./Button";

type BoxContainerProps = {
    children: ReactNode | ReactNode[];
}

const BoxContainer: FC<BoxContainerProps> = function ({ children }) {
	const [isOpen, setIsOpen] = useState(true);

	return(
		<div className="box">
			<Button 
				isOpen={isOpen}
				handleClick={() => setIsOpen(open => !open)}
			/>
			{isOpen && children}
		</div>
	);
};

export default BoxContainer;