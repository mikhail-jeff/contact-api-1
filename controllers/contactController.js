import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";

// @desc GET ALL contacts
// @route GET /api/contacts
// @access PRIVATE
const getContacts = asyncHandler(async (req, res) => {
	const contacts = await Contact.find({ user_id: req.user.id });

	res.status(200).json(contacts);
});

// @desc CREATE contact
// @route POST /api/contacts
// @access PRIVATE
const creatContact = asyncHandler(async (req, res) => {
	const { name, email, phone } = req.body;

	if (!name || !email || !phone) {
		res.status(400);
		throw new Error("All fields are mandatory");
	}

	const contact = await Contact.create({
		user_id: req.user.id,
		name,
		email,
		phone,
	});

	res.status(201).json(contact);
});

// @desc GET contact
// @route GET /api/contacts/:id
// @access PRIVATE
const getContact = asyncHandler(async (req, res) => {
	const contact = await Contact.findById(req.params.id);

	if (!contact) {
		res.status(404);
		throw new Error("Contact NOT Found");
	}

	res.status(200).json(contact);
});

// @desc UPDATE contact
// @route PUT /api/contacts/:id
// @access PRIVATE
const updateContact = asyncHandler(async (req, res) => {
	const contact = await Contact.findById(req.params.id);

	if (!contact) {
		res.status(404);
		throw new Error("Contact NOT Found");
	}

	// validate
	if (contact.user_id.toString() !== req.user.id) {
		res.status(403);
		throw new Error("User do not have permission to update other user contacts");
	}

	const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

	res.status(200).json({
		message: "contact updated",
		updatedContact,
	});
});

// @desc DELETE contact
// @route DELETE /api/contacts/:id
// @access PRIVATE
const deleteContact = asyncHandler(async (req, res) => {
	const contact = await Contact.findById(req.params.id);

	if (!contact) {
		res.status(404);
		throw new Error("Contact NOT Found");
	}

	// validate
	if (contact.user_id.toString() !== req.user.id) {
		res.status(403);
		throw new Error("User do not have permission to delete other user contacts");
	}

	await Contact.deleteOne({ _id: req.params.id });

	res.status(200).json({
		message: "contact deleted",
		contact,
	});
});

export { getContacts, creatContact, getContact, updateContact, deleteContact };
