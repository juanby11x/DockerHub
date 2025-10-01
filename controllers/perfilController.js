// Controlador para rutas protegidas
const perfilController = {
    // Obtener perfil de usuario
    getProfile: (req, res) => {
        try {
            // Crear perfil basado en el usuario autenticado
            let perfilUsuario;
            
            if (req.user.role === 'admin') {
                // Perfil de administrador
                perfilUsuario = {
                    username: req.user.username,
                    role: req.user.role,
                    saldo: 5000,
                    juegosFavoritos: ['Minecraft', 'The Witcher 3', 'Cyberpunk 2077'],
                    ultimasCompras: [
                        { juego: 'Cyberpunk 2077', precio: 59.99 },
                        { juego: 'FIFA 24', precio: 69.99 }
                    ]
                };
            } else {
                // Perfil de usuario normal (Google o nuevo usuario)
                perfilUsuario = {
                    username: req.user.username,
                    role: req.user.role || 'usuario',
                    saldo: 1000,
                    juegosFavoritos: [],
                    ultimasCompras: []
                };
            }
            
            res.json({
                message: 'Acceso autorizado a perfil protegido',
                perfil: perfilUsuario
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener perfil' });
        }
    }
};

module.exports = perfilController;
