// Modelo del carrito de compras (simulado sin base de datos)
class CartModel {
    constructor() {
        // Simular almacenamiento en memoria (en producción sería una base de datos)
        this.carts = new Map();
    }

    // Obtener carrito del usuario
    getUserCart(userId) {
        if (!this.carts.has(userId)) {
            this.carts.set(userId, []);
        }
        return this.carts.get(userId);
    }

    // Agregar producto al carrito
    addToCart(userId, product) {
        const cart = this.getUserCart(userId);
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += product.quantity || 1;
        } else {
            cart.push({
                ...product,
                quantity: product.quantity || 1,
                addedAt: new Date()
            });
        }
        
        return cart;
    }

    // Actualizar cantidad de un producto
    updateQuantity(userId, productId, quantity) {
        const cart = this.getUserCart(userId);
        const item = cart.find(item => item.id === productId);
        
        if (!item) {
            throw new Error('Producto no encontrado en el carrito');
        }
        
        if (quantity <= 0) {
            // Si la cantidad es 0 o menor, eliminar el producto
            return this.removeFromCart(userId, productId);
        }
        
        item.quantity = quantity;
        return cart;
    }

    // Eliminar producto del carrito
    removeFromCart(userId, productId) {
        const cart = this.getUserCart(userId);
        const filteredCart = cart.filter(item => item.id !== productId);
        this.carts.set(userId, filteredCart);
        return filteredCart;
    }

    // Vaciar carrito completo
    clearCart(userId) {
        this.carts.set(userId, []);
        return [];
    }

    // Obtener total del carrito
    getCartTotal(userId) {
        const cart = this.getUserCart(userId);
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Verificar si el carrito está vacío
    isCartEmpty(userId) {
        const cart = this.getUserCart(userId);
        return cart.length === 0;
    }
}

// Exportar una instancia única del modelo
module.exports = new CartModel();
