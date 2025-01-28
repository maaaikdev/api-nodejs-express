const express = require("express");
const router = express.Router();
const { validatorCreateItem, validatorGetItem } = require("../validators/tracks");
const {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
  } = require("../controllers/tracks");
const authMiddleware = require("../middleware/session");
const checkRole = require("../middleware/role");

//TODO http://localhost/tracks GET, POST, DELETE, PUT

/**
 * Get Items list
 */

router.get('/', authMiddleware, getItems);

/**
 * Get Item
 */

router.get('/:id', authMiddleware, validatorGetItem, getItem);

/**
 * Create item
 */
router.post('/', authMiddleware, checkRole(["user", "admin"]), validatorCreateItem, createItem);

/**
 * Update item
 */
router.put('/:id', authMiddleware, validatorCreateItem, validatorGetItem, updateItem);

/**
 * Delete item
 */
router.delete('/:id', authMiddleware, validatorGetItem, deleteItem);

module.exports = router;