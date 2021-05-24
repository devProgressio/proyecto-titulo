/*

    Noticias
    Ruta: '/api/noticias'

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getNoticias,
    crearNoticia,
    actualizarNoticia,
    eliminarNoticia
} = require('../controllers/noticias');

const router = Router();

router.get('/', getNoticias);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('activaHasta', 'La fecha y hora activa son obligatorias').not().isEmpty(),
        check('usuario', 'Falta el identificador del usuario.').isMongoId(),
        validarCampos
    ],
    crearNoticia
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarNoticia);

router.delete('/:id', [
    validarJWT,
    eliminarNoticia
]);

module.exports = router;