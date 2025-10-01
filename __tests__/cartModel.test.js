const cartModel = require('../models/cartModel');

describe('CartModel', () => {
  // Ya no necesitamos instanciarlo, usamos la instancia global

  beforeEach(() => {
    // Asegurarse de que el modelo esté en un estado limpio para cada usuario de prueba
    cartModel.carts.clear(); // Limpiamos completamente el mapa de carritos
  });

  test('should initialize an empty cart for a completely new user', () => {
    const newUserId = 'brandNewUser';
    const cart = cartModel.getUserCart(newUserId);
    expect(cart).toEqual([]);
    expect(cartModel.getCartTotal(newUserId)).toBe(0);
    expect(cartModel.isCartEmpty(newUserId)).toBe(true);
  });

  test('should return an empty cart for a new user', () => {
    const userId = 'testUser1';
    const cart = cartModel.getUserCart(userId);
    expect(cart).toEqual([]);
    expect(cartModel.getCartTotal(userId)).toBe(0);
    expect(cartModel.isCartEmpty(userId)).toBe(true);
  });

  test('should report cart as not empty when it contains products', () => {
    const userId = 'testUser1';
    const product = { id: 1, title: 'Game A', price: 10, quantity: 1 };
    cartModel.addToCart(userId, product);
    expect(cartModel.isCartEmpty(userId)).toBe(false);
  });

  test('should add a product to the cart', () => {
    const userId = 'testUser1';
    const product = { id: 1, title: 'Game A', price: 10 }; // Sin quantity inicial
    cartModel.addToCart(userId, product);
    const cart = cartModel.getUserCart(userId);
    expect(cart.length).toBe(1);
    expect(cart[0]).toEqual({ ...product, quantity: 1, addedAt: expect.any(Date) });
    expect(cartModel.getCartTotal(userId)).toBe(10);
  });

  test('should add a product with specified quantity', () => {
    const userId = 'testUser1';
    const product = { id: 2, title: 'Game B', price: 20, quantity: 3 };
    cartModel.addToCart(userId, product);
    const cart = cartModel.getUserCart(userId);
    expect(cart.length).toBe(1);
    expect(cart[0]).toEqual({ ...product, addedAt: expect.any(Date) });
    expect(cart[0].quantity).toBe(3);
    expect(cartModel.getCartTotal(userId)).toBe(60);
  });

  test('should increase quantity if product already exists', () => {
    const userId = 'testUser1';
    const product = { id: 1, title: 'Game A', price: 10, quantity: 1 };
    cartModel.addToCart(userId, product);
    // Añadir el mismo producto sin especificar quantity
    cartModel.addToCart(userId, { id: 1, title: 'Game A', price: 10 });
    const cart = cartModel.getUserCart(userId);
    expect(cart.length).toBe(1);
    expect(cart[0].quantity).toBe(2); // 1 + 1 (por defecto)
    expect(cartModel.getCartTotal(userId)).toBe(20);
  });

  test('should update product quantity', () => {
    const userId = 'testUser1';
    const product = { id: 1, title: 'Game A', price: 10, quantity: 1 };
    cartModel.addToCart(userId, product);
    cartModel.updateQuantity(userId, 1, 5);
    const cart = cartModel.getUserCart(userId);
    expect(cart.length).toBe(1);
    expect(cart[0].quantity).toBe(5);
    expect(cartModel.getCartTotal(userId)).toBe(50);
  });

  test('should remove product if quantity is updated to 0', () => {
    const userId = 'testUser1';
    const product = { id: 1, title: 'Game A', price: 10, quantity: 1 };
    cartModel.addToCart(userId, product);
    cartModel.updateQuantity(userId, 1, 0);
    const cart = cartModel.getUserCart(userId);
    expect(cart.length).toBe(0);
    expect(cartModel.getCartTotal(userId)).toBe(0);
  });

  test('should remove a product from the cart', () => {
    const userId = 'testUser1';
    const product1 = { id: 1, title: 'Game A', price: 10, quantity: 1 };
    const product2 = { id: 2, title: 'Game B', price: 20, quantity: 1 };
    cartModel.addToCart(userId, product1);
    cartModel.addToCart(userId, product2);
    cartModel.removeFromCart(userId, 1);
    const cart = cartModel.getUserCart(userId);
    expect(cart.length).toBe(1);
    expect(cart[0].id).toBe(2);
    expect(cartModel.getCartTotal(userId)).toBe(20);
  });

  test('should clear the entire cart', () => {
    const userId = 'testUser1';
    const product1 = { id: 1, title: 'Game A', price: 10, quantity: 1 };
    const product2 = { id: 2, title: 'Game B', price: 20, quantity: 1 };
    cartModel.addToCart(userId, product1);
    cartModel.addToCart(userId, product2);
    cartModel.clearCart(userId);
    const cart = cartModel.getUserCart(userId);
    expect(cart.length).toBe(0);
    expect(cartModel.getCartTotal(userId)).toBe(0);
  });

  test('should return 0 for total if cart is empty', () => {
    const userId = 'testUser1';
    expect(cartModel.getCartTotal(userId)).toBe(0);
  });

  test('should throw error if product not found on updateQuantity', () => {
    const userId = 'testUser1';
    expect(() => cartModel.updateQuantity(userId, 99, 1)).toThrow('Producto no encontrado en el carrito');
  });
});
