const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // Validar tipo
    const tiposValidos = ['faltas', 'noticias', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es valido el tipo'
        })
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    // Procesar la imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.'); // marth.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validar extension
    const extensionesValida = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValida.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = uuidv4().concat('.').concat(extensionArchivo);

    // Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;


    // Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log('Error: ', err);
            return res.status(400).json({
                ok: false,
                msg: 'Error al mover la imagen'
            })
        }

        // Actualizar la base de datos
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        })
    });
}

const retornaImagen = (req, res) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    let pathImg = path.join(__dirname, `../uploads/${ tipo }/${ foto }`);

    // Imagen por defecto.
    pathImg = fs.existsSync(pathImg) ? pathImg : path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg);
}

module.exports = {
    fileUpload,
    retornaImagen
}