const mongoose = require("mongoose");

const suppliersSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	company: String,
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phone: {
		type: String,
		required: true,
		unique: true,
	},
	picture: {
		type: String,
		default:
			"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
	},
	requests: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Request",
		},
	],
});

module.exports = mongoose.model("Supplier", suppliersSchema);
