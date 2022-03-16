require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const server = express();
const connectDB = require("./db/connect");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

server.use(cors({ origin: "http://localhost:3000", credentials: true }));
server.use(express.json());
server.use(cookieParser());
server.use("/", authRouter);
server.use("/user", userRouter);

server.use(notFoundMiddleware);
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
