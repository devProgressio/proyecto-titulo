require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar CORS //Middleware
app.use(cors());

// Lectura y parseo
app.use(express.json());

//BASE DE DATOS
dbConnection();

//user: mean_user
//pass: fJgBJvXlXTK4L6F1

// Directorio público
app.use(express.static('public'));

//Rutas
app.use('/api/usuarios', require('./router/usuarios'));
app.use('/api/login', require('./router/auth'));
app.use('/api/upload', require('./router/uploads'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});