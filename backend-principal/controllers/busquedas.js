const { response } = require("express");

const Usuario = require('../models/usuario');
const Noticia = require('../models/noticia');
const Planilla = require('../models/planilla');

const getTodo = async(req, res = response) => {

    // Se puede paginar si es que es necesario.
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, noticias, planillas] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Noticia.find({ nombre: regex }),
        Planilla.find({ nombre: regex })
    ]);

    res.json({
        ok: true,
        usuarios,
        noticias,
        planillas
    })

}

const getDocumentoColeccion = async(req, res = response) => {

    // Se puede paginar si es que es necesario.
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    /* const [usuarios, noticias, planillas] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Noticia.find({ nombre: regex }),
        Planilla.find({ nombre: regex })
    ]); */

    let data = [];

    switch (tabla) {
        case 'noticias':
            data = await Noticia.find({ nombre: regex });
            break;

        case 'planillas':
            data = await Planilla.find({ nombre: regex });
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla no existe.'
            });
    }

    res.json({
        ok: true,
        resultados: data
    })

}

module.exports = {
    getTodo,
    getDocumentoColeccion
}