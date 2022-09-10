require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");
const errorHandler = require("./middleware/errorHandlerMiddleware");

const run = async () => {
	const app = express();
	app.use(express.json({ limit: "50mb" }));
	app.use(cookieParser());
	app.use(cors());
	app.use(
		fileUpload({
			useTempFiles: true,
		})
	);

	// Routes
	app.use("/user", require("./routes/userRouter"));
	app.use("/api", require("./routes/categoryRouter"));
	app.use("/api", require("./routes/upload"));
	app.use("/api", require("./routes/productRouter"));
	app.use("/api", require("./routes/paymentRouter"));

	app.use("/api", require("./routes/posts"));
	app.use("/api", require("./routes/offers"));

	app.use("/api/suppliers", require("./routes/suppliersRouter"));
	app.use("/api/requests", require("./routes/requestsRouter"));

	// error handler
	app.use(errorHandler);

	// Connect to mongodb
	console.log("Connecting to DB...");
	const URI = process.env.MONGODB_URL;
	await mongoose.connect(URI, {
		useCreateIndex: true,
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log("Connected to MongoDB");

	const PORT = process.env.PORT || 5007;
	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
};

run().catch(console.error);
