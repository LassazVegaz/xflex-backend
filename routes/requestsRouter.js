const requestsController = require("../controllers/requestsCtrl");
const { Router } = require("express");

const router = Router();

// create request
router.post("/", async (req, res, next) => {
	try {
		const { supplierId, items } = req.body;
		const request = await requestsController.createRequest(
			supplierId,
			items
		);
		await requestsController.emailRequestDetails(request._id, supplierId);

		res.status(201).json(request);
	} catch (error) {
		next(error);
	}
});

// get all requests
router.get("/", async (req, res, next) => {
	try {
		const { supplierId } = req.query;
		const requests = await requestsController.getRequests(supplierId);
		res.json(requests);
	} catch (error) {
		next(error);
	}
});

// change request status
router.patch("/:id/change_status", async (req, res, next) => {
	try {
		const request = await requestsController.changeRequestStatus(
			req.params.id,
			req.body.status
		);
		res.json(request);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
