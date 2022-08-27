const Router = require("express").Router;
const suppliersController = require("../controllers/suppliersCtrl");

const router = Router();

// search suppliers
router.get("/", async (req, res) => {
	const { search } = req.query;
	const suppliers = await suppliersController.getSuppliers(search);
	res.json(suppliers);
});

// check if email exists
router.get("/check_email", async (req, res) => {
	const { email } = req.query;
	const exists = await suppliersController.checkEmail(email);
	res.json(exists);
});

// check if phone exists
router.get("/check_phone", async (req, res) => {
	const { phone } = req.query;
	const exists = await suppliersController.checkPhone(phone);
	res.json(exists);
});

// create supplier
router.post("/", async (req, res) => {
	const newSupplier = await suppliersController.createSupplier(req.body);
	res.json(newSupplier);
});

module.exports = router;
