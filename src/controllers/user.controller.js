const User = require('../models/user.model');
const mongoose = require('mongoose');


exports.getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;
        const query = search ? { name: { $regex: search, $options: 'i' } } : {};

        const users = await User.find(query)
            .select('-password')
            .populate({ path: 'role', select: 'roleName accessModules' })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        const total = await User.countDocuments(query);

        res.json({ users, total, page: parseInt(page), limit: parseInt(limit) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getUserById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }
        const user = await User.findById(req.params.userId).select('-password')
        .populate({ path: 'role', select: 'roleName accessModules' })
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User updated successfully', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.bulkUpdateUsers = async (req, res) => {
    try {
        const { updateData } = req.body;
        const result = await User.updateMany( { $set: updateData });
        res.json({ message: 'Users updated successfully', result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


