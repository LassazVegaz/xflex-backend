require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");
const errorHandler = require("./middleware/errorHandlerMiddleware");


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
