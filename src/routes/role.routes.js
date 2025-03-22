const express = require('express');
const { checkAccess, createRole, getAllRoles, getRoleById, updateRole, deleteRole } = require('../controllers/role.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const router = express.Router();

//Admin routes
router.post('/roles',authenticate, authorize(['admin']),createRole);
router.get('/', authenticate, authorize(['admin']), getAllRoles);
router.get('/:roleId', authenticate, authorize(['admin']), getRoleById);
router.patch('/:roleId', authenticate, authorize(['admin']), updateRole);
router.delete('/:roleId', authenticate, authorize(['admin']), deleteRole);
router.post('/check-access', authenticate, authorize(['admin']), checkAccess);

module.exports = router;