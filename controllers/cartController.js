const cartModel = require('../models/cartModel');

const cartController = {
    // GET /api/carrito - Obtener carrito del usuario
    getUserCart: async (req, res) => {
        try {
            const userId = req.user.id;
            const cart = cartModel.getUserCart(userId);
            const total = cartModel.getCartTotal(userId);
            
            res.json({
                success: true,
                cart: cart,
                total: total,
                itemCount: cart.length
            });
        } catch (error) {
            console.error('Error al obtener carrito:', error);
            res.status(500).json({
                success: false,
                error: 'Error al obtener el carrito'
            });
        }
    },

    // POST /api/carrito/add - Agregar producto al carrito
    addToCart: async (req, res) => {
        try {
            const userId = req.user.id;
            const { id, title, price, quantity = 1 } = req.body;
            
            if (!id || !title || price === undefined) {
                return res.status(400).json({
                    success: false,
                    error: 'Datos del producto incompletos'
                });
            }
            
            if (quantity <= 0) {
                return res.status(400).json({
                    success: false,
                    error: 'La cantidad debe ser mayor a 0'
                });
            }
            
            const product = { id, title, price, quantity };
            const updatedCart = cartModel.addToCart(userId, product);
            const total = cartModel.getCartTotal(userId);
            
            res.json({
                success: true,
                message: 'Producto agregado al carrito',
                cart: updatedCart,
                total: total,
                addedProduct: product
            });
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            res.status(500).json({
                success: false,
                error: 'Error al agregar producto al carrito'
            });
        }
    },

    // PUT /api/carrito/update/:productId - Actualizar cantidad
    updateQuantity: async (req, res) => {
        try {
            const userId = req.user.id;
            const { productId } = req.params;
            const { quantity } = req.body;
            
            if (quantity === undefined || quantity < 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Cantidad inválida'
                });
            }
            
            const updatedCart = cartModel.updateQuantity(userId, parseInt(productId), quantity);
            const total = cartModel.getCartTotal(userId);
            
            res.json({
                success: true,
                message: 'Cantidad actualizada',
                cart: updatedCart,
                total: total
            });
        } catch (error) {
            console.error('Error al actualizar cantidad:', error);
            if (error.message === 'Producto no encontrado en el carrito') {
                return res.status(404).json({
                    success: false,
                    error: 'Producto no encontrado en el carrito'
                });
            }
            res.status(500).json({
                success: false,
                error: 'Error al actualizar la cantidad'
            });
        }
    },

    // DELETE /api/carrito/remove/:productId - Eliminar producto
    removeFromCart: async (req, res) => {
        try {
            const userId = req.user.id;
            const { productId } = req.params;
            
            const updatedCart = cartModel.removeFromCart(userId, parseInt(productId));
            const total = cartModel.getCartTotal(userId);
            
            res.json({
                success: true,
                message: 'Producto eliminado del carrito',
                cart: updatedCart,
                total: total
            });
        } catch (error) {
            console.error('Error al eliminar del carrito:', error);
            res.status(500).json({
                success: false,
                error: 'Error al eliminar producto del carrito'
            });
        }
    },

    // DELETE /api/carrito/clear - Vaciar carrito
    clearCart: async (req, res) => {
        try {
            const userId = req.user.id;
            const emptyCart = cartModel.clearCart(userId);
            
            res.json({
                success: true,
                message: 'Carrito vaciado exitosamente',
                cart: emptyCart,
                total: 0
            });
        } catch (error) {
            console.error('Error al vaciar carrito:', error);
            res.status(500).json({
                success: false,
                error: 'Error al vaciar el carrito'
            });
        }
    }
};

module.exports = cartController;
