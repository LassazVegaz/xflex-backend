const Router = require("express").Router;
const suppliersController = require("../controllers/suppliersCtrl");

const router = Router();

// get supplier by id
router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const supplier = await suppliersController.getSupplierById(id);
		res.status(200).json(supplier);
	} catch (error) {
		next(error);
	}
});

// search suppliers
router.get("/", async (req, res, next) => {
	try {
		const { search } = req.query;
		const suppliers = await suppliersController.getSuppliers(search);
		res.json(suppliers);
	} catch (error) {
		next(error);
	}
});

// check if email exists
router.get("/check_email", async (req, res, next) => {
	try {
		const { email } = req.query;
		const exists = await suppliersController.checkEmail(email);
		res.json(exists);
	} catch (error) {
		next(error);
	}
});

// check if phone exists
router.get("/check_phone", async (req, res, next) => {
	try {
		const { phone } = req.query;
		const exists = await suppliersController.checkPhone(phone);
		res.json(exists);
	} catch (error) {
		next(error);
	}
});

// create supplier
router.post("/", async (req, res, next) => {
	try {
		const newSupplier = await suppliersController.createSupplier(req.body);
		res.json(newSupplier);
	} catch (error) {
		next(error);
	}
});

// update supplier
router.put("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const updatedSupplier = await suppliersController.updateSupplier(
			id,
			req.body
		);
		res.json(updatedSupplier);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
