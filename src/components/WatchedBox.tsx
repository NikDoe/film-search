import { FC } from "react";
import BoxContainer from "./BoxContainer";
import { TempWatchedDataType } from "../App";
import WatchedSummary from "./WatchedSummary";
import WatchedList from "./WatchedList";

type WatchedBoxProps = {
    watched: TempWatchedDataType[];
}

const WatchedBox: FC<WatchedBoxProps> = function ({ watched }) {
	return (
		<BoxContainer>
			<WatchedSummary watched={watched} />
			<WatchedList watched={watched} />
		</BoxContainer>
	);
};

export default WatchedBox;