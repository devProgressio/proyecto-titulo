/* 

ruta: api/todo/

*/

const { Router } = require('express');
const { getTodo, getDocumentoColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/:busqueda', validarJWT, getTodo);

router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentoColeccion);


module.exports = router;