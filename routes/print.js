const express = require('express');
const router = express.Router();
const { printOrder } = require('../controllers/printer');

router.post('/imprimir', (req, res) => {
  const pedido = req.body;
  printOrder(pedido);
  res.json({ status: 'Enviado para impressão' });
});

module.exports = router;
