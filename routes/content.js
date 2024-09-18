const express = require('express');
const Content = require('../models/Content');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware para verificar API key
function authenticateApiKey(req, res, next) {
  const apiKey = req.header('x-api-key');
  if (!apiKey) return res.status(401).send('Acceso denegado. No se proporcionó API Key.');

  try {
    const verified = jwt.verify(apiKey, 'api_key_secret');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('API Key no válida');
  }
}

// Obtener lista de contenido
router.get('/', authenticateApiKey, async (req, res) => {
  const content = await Content.find();
  res.send(content);
});

// Agregar nuevo contenido (solo para admins, si se quiere extender)
router.post('/add', authenticateApiKey, async (req, res) => {
  const { title, genre, description, url, type } = req.body;
  const content = new Content({ title, genre, description, url, type });
  await content.save();
  res.send(content);
});

module.exports = router;
