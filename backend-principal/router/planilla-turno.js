/*

    PlanillaTurno
    Ruta: '/api/planilla-turno'

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getPlanillaTurno,
    crearPlanillaTurno,
    actualizarPlanillaTurno,
    eliminarPlanillaTurno
} = require('../controllers/planilla-turno');

const router = Router();

router.get('/', getPlanillaTurno);

router.post('/', [
        validarJWT,
        check('planilla', 'Falta el identificador de la planilla.').isMongoId(),
        check('fechaHoraInicio', 'La fecha inicio del turno necesaria.').not().isEmpty(),
        check('fechaHoraTermino', 'La fecha término del turno necesaria.').not().isEmpty(),
        check('cantidad', 'La cantidad es necesaria.').not().isEmpty(),
        validarCampos
    ],
    crearPlanillaTurno
);

router.put('/:id', [
        validarJWT,
        check('planilla', 'Falta el identificador de la planilla.').not().isEmpty(),
        check('fechaHoraInicio', 'La fecha inicio del turno necesaria.').not().isEmpty(),
        check('fechaHoraTermino', 'La fecha término del turno necesaria.').not().isEmpty(),
        check('cantidad', 'La cantidad es necesaria.').not().isEmpty(),
        validarCampos
    ],
    actualizarPlanillaTurno);

router.delete('/:id', [
    validarJWT
], eliminarPlanillaTurno);

module.exports = router;