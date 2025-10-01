const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const profileController = require('../controllers/perfilController');
const juegosController = require('../controllers/juegosController');
const cartController = require('../controllers/cartController');

// Ruta protegida por JWT
router.get('/perfil', authMiddleware, profileController.getProfile);

// Rutas para juegos (protegidas)
router.get('/juegos', authMiddleware, juegosController.getGames);
router.get('/juegos/:id', authMiddleware, juegosController.getGameById);
router.post('/comprar', authMiddleware, juegosController.processPurchase);

// Rutas del carrito (protegidas por JWT)
router.get('/carrito', authMiddleware, cartController.getUserCart);
router.post('/carrito/add', authMiddleware, cartController.addToCart);
router.put('/carrito/update/:productId', authMiddleware, cartController.updateQuantity);
router.delete('/carrito/remove/:productId', authMiddleware, cartController.removeFromCart);
router.delete('/carrito/clear', authMiddleware, cartController.clearCart);

module.exports = router;
 