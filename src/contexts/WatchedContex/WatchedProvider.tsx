import { useMemo } from "react";
import { WatchedContext } from "./WatchedContext";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import { TempWatchedDataType, WatchedProviderProps } from "../../types";

function WatchedProvider({ children }: WatchedProviderProps) {
	const [watched, setWatched] = useLocalStorageState<TempWatchedDataType[]>('watched', []);	
    
	const memoizedValue = useMemo(() => ({
		watched,
		setWatched
	}), [setWatched, watched]);
    
	return (
		<WatchedContext.Provider
			value={memoizedValue}
		>
			{children}
		</WatchedContext.Provider>
	);
}

export default WatchedProvider;
