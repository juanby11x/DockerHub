const juegosController = {
    // Obtener todos los juegos disponibles
    getGames: async (req, res) => {
        try {
            // Simulación de base de datos de juegos
            const juegos = [
                {
                    id: 1,
                    title: "Cyberpunk 2077",
                    description: "Un RPG de acción y aventura en un mundo futurista distópico.",
                    price: 59.99,
                    genre: "rpg",
                    rating: 4.2,
                    image: "🎮",
                    stock: 50
                },
                {
                    id: 2,
                    title: "FIFA 24",
                    description: "El simulador de fútbol más realista del mercado.",
                    price: 69.99,
                    genre: "deportes",
                    rating: 4.5,
                    image: "⚽",
                    stock: 75
                },
                {
                    id: 3,
                    title: "Call of Duty: Warzone",
                    description: "Battle royale gratuito con gráficos espectaculares.",
                    price: 0,
                    genre: "accion",
                    rating: 4.3,
                    image: "🔫",
                    stock: 999
                },
                {
                    id: 4,
                    title: "The Witcher 3",
                    description: "Una épica aventura de fantasía con decisiones que importan.",
                    price: 39.99,
                    genre: "rpg",
                    rating: 4.8,
                    image: "⚔️",
                    stock: 30
                },
                {
                    id: 5,
                    title: "Minecraft",
                    description: "Construye, explora y sobrevive en un mundo de bloques.",
                    price: 26.95,
                    genre: "aventura",
                    rating: 4.6,
                    image: "⛏️",
                    stock: 100
                },
                {
                    id: 6,
                    title: "Civilization VI",
                    description: "Construye tu imperio y domina el mundo.",
                    price: 59.99,
                    genre: "estrategia",
                    rating: 4.4,
                    image: "🏛️",
                    stock: 45
                },
                {
                    id: 7,
                    title: "Red Dead Redemption 2",
                    description: "Una épica historia del Salvaje Oeste americano.",
                    price: 49.99,
                    genre: "aventura",
                    rating: 4.7,
                    image: "🤠",
                    stock: 25
                },
                {
                    id: 8,
                    title: "Grand Theft Auto V",
                    description: "Vive la vida criminal en Los Santos.",
                    price: 29.99,
                    genre: "accion",
                    rating: 4.6,
                    image: "🚗",
                    stock: 60
                }
            ];

            res.json({
                success: true,
                juegos: juegos
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al obtener los juegos'
            });
        }
    },

    // Obtener juego por ID
    getGameById: async (req, res) => {
        try {
            const { id } = req.params;
            
            // Simulación de búsqueda en base de datos
            const juegos = [
                // ... mismos juegos que arriba
            ];
            
            const juego = juegos.find(j => j.id === parseInt(id));
            
            if (!juego) {
                return res.status(404).json({
                    success: false,
                    error: 'Juego no encontrado'
                });
            }

            res.json({
                success: true,
                juego: juego
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al obtener el juego'
            });
        }
    },

    // Procesar compra de juegos
    processPurchase: async (req, res) => {
        try {
            const { juegos, total } = req.body;
            const userId = req.user.id; // Viene del middleware de autenticación

            // Aquí se procesaría la compra en la base de datos
            // Por ahora solo simulamos el éxito

            res.json({
                success: true,
                message: 'Compra procesada exitosamente',
                orderId: Date.now(), // ID de orden simulado
                total: total
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Error al procesar la compra'
            });
        }
    }
};

module.exports = juegosController;
