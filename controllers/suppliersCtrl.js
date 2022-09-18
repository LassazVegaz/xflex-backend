const Supplier = require("../models/suppliersModel");
const requestsCtrl = require("./requestsCtrl");
const ITEMS_PER_PAGE = 5;

// check if email exists
const checkEmail = async (email) => {
	const supplier = await Supplier.findOne({ email });
	return Boolean(supplier);
};

// check if phone exists
const checkPhone = async (phone) => {
	const supplier = await Supplier.findOne({ phone });
	return Boolean(supplier);
};

// create a supplier
const createSupplier = async (supplierModel) => {
	const supplier = new Supplier(supplierModel);
	const newSup = await supplier.save();
	return newSup.toJSON();
};

// search suppliers
const getSuppliers = async (searchText, pageNo) => {
	let wherePart = {};
	if (searchText) {
		const regExp = new RegExp(searchText, "i");
		wherePart = {
			$or: [
				{
					firstName: regExp,
				},
				{
					lastName: regExp,
				},
				{
					company: regExp,
				},
				{
					email: regExp,
				},
			],
		};
	}

	let query = Supplier.find(wherePart);
	if (pageNo) {
		query = query.skip((pageNo - 1) * ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE);
	}
	const suppliers = await query;

	const count = await Supplier.countDocuments(wherePart);

	return {
		suppliers: suppliers.map((supplier) => supplier.toJSON()),
		count,
	};
};

// get total suppliers count
const getTotalSuppliersCount = async () => {
	const count = await Supplier.countDocuments();
	return count;
};

// get supplier by id
const getSupplierById = async (id) => {
	const supplier = await Supplier.findById(id);
	return supplier?.toJSON();
};

// update supplier
const updateSupplier = async (id, supplierModel) => {
	const updatedSupplier = await Supplier.findByIdAndUpdate(
		id,
		supplierModel,
		{
			new: true,
		}
	);
	return updatedSupplier.toJSON();
};

// delete supplier
const deleteSupplier = async (id) => {
	await Supplier.findByIdAndDelete(id);
};

// get report data
const getReportData = async (supplierId) => {
	const supplier = await getSupplierById(supplierId);
	const requests = await requestsCtrl.getRequests(supplierId);
	const title = `Supplier Report - ${supplier.firstName} ${supplier.lastName}`;
	const reportData = {
		title,
		supplier,
		requests,
	};
	return reportData;
};

module.exports = {
	createSupplier,
	getSuppliers,
	checkEmail,
	checkPhone,
	getSupplierById,
	updateSupplier,
	deleteSupplier,
	getTotalSuppliersCount,
	getReportData,
};
