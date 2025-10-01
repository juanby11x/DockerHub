const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwtConfig');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body; // aquí viene el ID Token
    if (!credential) {
      return res.status(400).json({ error: 'No se recibió el token de Google' });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Crear un perfil de usuario simulado para Google
    const userProfile = {
      id: payload.sub,
      username: payload.name,
      email: payload.email,
      role: 'usuario',
      saldo: 1000, // Saldo inicial para usuarios de Google
      juegosFavoritos: [],
      ultimasCompras: []
    };

    // Generar token JWT
    const token = jwt.sign(
      { 
        id: payload.sub, 
        username: payload.name, 
        email: payload.email 
      }, 
      secret, 
      { expiresIn }
    );

    // Devolver token y datos del usuario
    res.json({
      message: "Login con Google exitoso",
      token: token,
      user: userProfile
    });

  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Token inválido de Google" });
  }
};

// Login normal con usuario y contraseña
const normalLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Usuario de prueba (en un caso real vendría de una base de datos)
    if (username === 'admin' && password === 'admin123') {
      const userProfile = {
        id: 'admin-001',
        username: username,
        email: 'admin@gamestore.com',
        role: 'admin',
        saldo: 5000,
        juegosFavoritos: ['Minecraft', 'The Witcher 3'],
        ultimasCompras: [
          { juego: 'Cyberpunk 2077', precio: 59.99 },
          { juego: 'FIFA 24', precio: 69.99 }
        ]
      };

      // Generar token JWT
      const token = jwt.sign(
        { 
          id: userProfile.id, 
          username: userProfile.username, 
          role: userProfile.role 
        }, 
        secret, 
        { expiresIn }
      );

      res.json({
        message: "Login exitoso",
        token: token,
        user: userProfile
      });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = { googleLogin, normalLogin };
