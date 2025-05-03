// backend/routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// GET all items
router.get('/', itemController.getAllItems);

// GET a single item
router.get('/:id', itemController.getItemById);

// POST create new item
router.post('/', itemController.createItem);

// PUT update an item
router.put('/:id', itemController.updateItem);

// DELETE an item
router.delete('/:id', itemController.deleteItem);

module.exports = router;