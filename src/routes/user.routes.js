const express = require('express');
const { getUsers, bulkUpdateUsers, getUserById, updateUser, deleteUser, checkAccess, bulkDifferentUpdateUsers } = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const router = express.Router();

// User routes
router.get('/', authenticate, authorize(['admin']), getUsers);
router.get('/:userId', authenticate, getUserById);
router.patch('/:userId', authenticate, updateUser);
router.delete('/:userId', authenticate, deleteUser);
router.put('/bulk-update', authenticate, authorize(['admin']), bulkUpdateUsers);

module.exports = router;