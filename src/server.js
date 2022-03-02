require("dotenv").config();
require("express-async-errors");

const express = require("express");
const server = express();
const connectDB = require("./db/connect");

const authRouter = require("./routes/auth");

const errorHandlerMiddleware = require("./middleware/error-handler");

server.use(express.json());
server.use("/", authRouter);

server.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		server.listen(port, () => {
			console.log(`Server listening on port ${port}...`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
