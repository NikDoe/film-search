export const getErrorMessage = (error: unknown): string | null => {
	if (error instanceof Error) {
		if(error.name !== "AbortError") {
			return error.message;
		}

		return null;
	} else {
		return 'Произошла неизвестная ошибка';
	}
};