const Supplier = require("../models/suppliersModel");

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
const getSuppliers = async (searchText) => {
	const suppliers = await Supplier.find({
		$or: [
			{
				firstName: { $regex: searchText, $options: "i" },
			},
			{
				lastName: { $regex: searchText, $options: "i" },
			},
			{
				company: { $regex: searchText, $options: "i" },
			},
			{
				email: { $regex: searchText, $options: "i" },
			},
		],
	});
	return suppliers.map((supplier) => supplier.toJSON());
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

module.exports = {
	createSupplier,
	getSuppliers,
	checkEmail,
	checkPhone,
	getSupplierById,
	updateSupplier,
};
