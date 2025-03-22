const mongoose = require('mongoose');
const Role = require('../models/role.model');
const userModel = require('../models/user.model');


// Create a role
exports.createRole = async (req, res) => {
    try {
        const role = new Role(req.body);
        await role.save();
        res.status(201).json(role);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all roles
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get role by ID
exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.roleId);
        if (!role) return res.status(404).json({ message: 'Role not found' });
        res.json(role);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update role
exports.updateRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndUpdate(req.params.roleId, req.body, { new: true });
        if (!role) return res.status(404).json({ message: 'Role not found' });
        res.json(role);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete role
exports.deleteRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.roleId);
        if (!role) return res.status(404).json({ message: 'Role not found' });
        res.json({ message: 'Role deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// check access
exports.checkAccess = async (req, res) => {
    try {
        const { module } = req.body;
        const userId = req.user.userId;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        const user = await userModel.findById(new mongoose.Types.ObjectId(userId)).populate('role');
        if (!user) return res.status(404).json({ error: 'User not found' });

        const hasAccess = user.role.accessModules.includes(module);
        res.json({ hasAccess, accessModules: user.role.accessModules });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};