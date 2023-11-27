import express from "express";

const router = express.Router();

import { getContacts, creatContact, getContact, updateContact, deleteContact } from "../controllers/contactController.js";
import validateToken from "../middleware/validateTokenHandler.js";

// Validate all routes
router.use(validateToken);

router.route("/").get(getContacts);
router.route("/").post(creatContact);
router.route("/:id").get(getContact);
router.route("/:id").put(updateContact);
router.route("/:id").delete(deleteContact);

export default router;
