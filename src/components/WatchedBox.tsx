import { FC, ReactNode } from "react";
import BoxContainer from "./BoxContainer";

type WatchedBoxProps = {
    children: ReactNode;
}

const WatchedBox: FC<WatchedBoxProps> = function ({ children }) {
	return (
		<BoxContainer>
			{children}
		</BoxContainer>
	);
};

export default WatchedBox;