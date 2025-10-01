const express = require('express');
const app = express();
const path = require('path');

// Middlewares
app.use(express.json()); // Para parsear/convertir json
app.use(express.static(path.join(__dirname, '/public'))); // Servir archivos estáticos

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

// Endpoint de health check para Docker
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Usar rutas
app.use('/api', authRoutes);
app.use('/api', protectedRoutes);

// Configuración del puerto
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});