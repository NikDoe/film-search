import { useEffect } from "react";

export const useKeyPress = function (
	targetKey: string,
	callback: () => void
) {
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if(event.code.toLowerCase() === targetKey.toLowerCase()) {
				callback();
			}
		};

		window.addEventListener("keydown", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, [targetKey, callback]);
};