import { useEffect, useState } from "react";

export const useLocalStorageState = function<T> (
	key: string, 
	initialValue: T
){
	const [value, setValue] = useState<T>(() => {
		const storeValue = localStorage.getItem(key);
		return storeValue ? JSON.parse(storeValue) : initialValue; 
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue] as const;
};