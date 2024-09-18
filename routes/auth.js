const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Registro de usuarios
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Verificar si el usuario ya existe
  let user = await User.findOne({ email });
  if (user) return res.status(400).send('El usuario ya existe');

  const apiKey = jwt.sign({ email }, 'api_key_secret');

  user = new User({ username, email, password, apiKey });
  await user.save();

  res.send({ apiKey });
});

// Login de usuarios
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Usuario no encontrado');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Contraseña incorrecta');

  const token = user.generateAuthToken();
  res.send({ token });
});

module.exports = router;
