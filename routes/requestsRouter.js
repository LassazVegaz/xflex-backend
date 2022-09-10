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

module.exports = router;
