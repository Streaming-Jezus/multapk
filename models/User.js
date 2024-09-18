const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  apiKey: { type: String, required: true },
});

// Hash de contraseña antes de guardar el usuario
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Generar token JWT
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, 'secret_key', { expiresIn: '1h' });
};

module.exports = mongoose.model('User', userSchema);
