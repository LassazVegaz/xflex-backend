const mongoose = require("mongoose");

const requestsSchema = new mongoose.Schema({
	items: [
		{
			code: {
				type: String,
				required: true,
				trim: true,
			},
			amount: {
				type: Number,
				default: 0,
			},
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
	status: {
		type: String,
		default: "pending",
		enum: ["pending", "recieved", "cancelled"],
	},
});

module.exports = mongoose.model("Request", requestsSchema);
