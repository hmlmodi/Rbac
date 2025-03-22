const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);