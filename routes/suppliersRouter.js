const Router = require("express").Router;
const suppliersController = require("../controllers/suppliersCtrl");
const ejs = require("ejs");
const path = require("path");
const pdf = require("html-pdf");
const fs = require("fs");

const router = Router();

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

// get suppliers count
router.get("/count", async (req, res, next) => {
	try {
		const count = await suppliersController.getTotalSuppliersCount();
		res.json(count);
	} catch (error) {
		next(error);
	}
});

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
		const { search, pageNo } = req.query;
		const suppliers = await suppliersController.getSuppliers(
			search,
			pageNo
		);
		res.json(suppliers);
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

// delete supplier
router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		await suppliersController.deleteSupplier(id);
		res.status(204).end();
	} catch (error) {
		next(error);
	}
});

// get suppliers report
router.get("/:id/report", async (req, res, next) => {
	try {
		const { id } = req.params;
		const reportData = await suppliersController.getReportData(id);
		const html = await ejs.renderFile(
			path.join(__dirname, "../reports/supplier-requests.ejs"),
			{ supplier: reportData }
		);
		const options = {
			format: "A4",
			orientation: "portrait",
			border: {
				top: "0.5in",
				right: "0.5in",
				bottom: "0.5in",
				left: "0.5in",
			},
		};
		pdf.create(html, options).toStream((err, stream) => {
			if (err) return next(err);
			res.setHeader(
				"Content-Disposition",
				`attachment; filename=${reportData.title}.pdf`
			);
			stream.pipe(res);
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
