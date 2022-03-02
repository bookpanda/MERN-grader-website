require("dotenv").config();

const express = require("express");
const server = express();

const authRouter = require("./routes/auth");

server.use("/", authRouter);

const port = process.env.PORT || 5000;
server.listen(port, () => {
	console.log(`Server listening on port ${port}...`);
});
