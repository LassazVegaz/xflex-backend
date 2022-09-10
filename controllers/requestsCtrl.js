const Request = require("../models/requestsModel");
const Supplier = require("../models/suppliersModel");

// create request
const createRequest = async (supplierId, items) => {
	const request = new Request({ items });
	await request.save();

	const supplier = await Supplier.findById(supplierId);
	supplier.requests.push(request._id);
	await supplier.save();

	return request;
};

module.exports = {
	createRequest,
};
