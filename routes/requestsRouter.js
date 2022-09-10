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

module.exports = router;
