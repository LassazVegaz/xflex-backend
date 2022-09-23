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

// get all requests
const getRequests = async (supplierId) => {
	const supplier = await Supplier.findById(supplierId).populate("requests");

	// group requests by status
	const groupedRequests = supplier.requests.reduce((acc, request) => {
		const key = request.status;
		if (!acc[key]) {
			acc[key] = [];
		}
		acc[key].push(request);
		return acc;
	}, {});

	return groupedRequests;
};

// change req status
const changeRequestStatus = async (requestId, status) => {
	const request = await Request.findById(requestId);
	request.status = status;
	await request.save();

	return request.toJSON();
};

module.exports = {
	createRequest,
	getRequests,
	changeRequestStatus,
};
