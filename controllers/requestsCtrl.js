const Request = require("../models/requestsModel");
const Supplier = require("../models/suppliersModel");
const nodemailer = require("nodemailer");

// create request
const createRequest = async (supplierId, items) => {
	const request = new Request({ items });
	await request.save();

	const supplier = await Supplier.findById(supplierId);
	supplier.requests.push(request._id);
	await supplier.save();

	return request;
};

// get email content for request items
const getEmailContent = async (requestId) => {
	const request = await Request.findById(requestId);

	const items = request.items.map(
		(item) => `<li>${item.code} - ${item.amount}</li>`
	);

	return `<h3>Please consider about the following request</h3>
	<br />
	<br />

	<ul>
		${items.join("")}
	</ul>

	<br />
	<br />
	<p>Thank you</p>`;
};

// send request details to supplier
const emailRequestDetails = async (requestId, supplierId) => {
	const supplier = await Supplier.findById(supplierId);

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD,
		},
		tls: {
			rejectUnauthorized: false,
		},
	});

	const emailContent = await getEmailContent(requestId);

	// send mail with defined transport object
	const info = await transporter.sendMail({
		from: process.env.EMAIL,
		to: supplier.email,
		subject: "Request from XFlex",
		html: emailContent,
	});

	console.log("Message sent: %s", info.messageId);
};

// get all requests
const getRequests = async (supplierId) => {
	// get all requests of the supplier and sort them by date
	const supplier = await Supplier.findById(supplierId).populate({
		path: "requests",
		options: { sort: { date: -1 } },
	});

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
	emailRequestDetails,
};
