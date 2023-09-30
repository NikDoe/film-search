import { FC } from "react";

type ErrorMessageProps = {
    message: null | string;
}

const ErrorMessage: FC<ErrorMessageProps> = function (props) {
	const {
		message
	} = props;
    
	return (
		<p className="error">
			{message} 😶
		</p>
	);
};

export default ErrorMessage;