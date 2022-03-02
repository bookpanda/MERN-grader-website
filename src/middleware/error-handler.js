const errorHandlerMiddleware = (err, req, res, next) => {
	console.log(err.statusCode);
	let customError = {
		statusCode: err.statusCode || 500,
		msg: err.message || "Something went wrong, please try again later",
	};
	return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
