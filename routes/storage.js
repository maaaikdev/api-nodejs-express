const express = require("express");
const router = express.Router();
const uploadMiddleware = require('../utils/handleStorage');
const { getItems, getItem, deleteItem, updateItem, createItem } = require('../controllers/storage');
const { validatorGetItem } = require("../validators/tracks");

/**
 * Get List Items
 */
router.get("/", getItems);

/**
 * Get Item
 */
router.get("/:id", validatorGetItem, getItem);

/**
 * Delete item
 */
router.delete("/:id", validatorGetItem, deleteItem);

/**
 * Cretae Item
 */
router.post("/", uploadMiddleware.single("myfile"), createItem)

module.exports = router;