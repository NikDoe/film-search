import { useState } from "react";
import StarRating from "./StarRating";

const TestComponent = function () {
	const [testRating, setTestRating] = useState(0);

	return (
		<>
			<StarRating 
				size={48}
				onSetRating={setTestRating}
			/>
			<h3>Оценка фильма {testRating}</h3>
		</>
	);
};

export default TestComponent;