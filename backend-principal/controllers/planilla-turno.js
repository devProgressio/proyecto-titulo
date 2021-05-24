const { response } = require("express");
const PlanillaTurno = require('../models/planilla-turno');

const getPlanillaTurno = (req, res = response) => {

    const planillaTurno = PlanillaTurno.find();

    try {

        res.json({
            ok: true,
            planillaTurno
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error al listar planillas turnos. Hable con el administrador.'
        });
    }

}

const crearPlanillaTurno = async(req, res = response) => {

    const planillaTurno = new PlanillaTurno(req.body);

    try {

        const planillaTurnoDB = await planillaTurno.save();

        res.json({
            ok: true,
            planillaTurno: planillaTurnoDB
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }

}

const actualizarPlanillaTurno = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarPlanillaTurno'
    })

}

const eliminarPlanillaTurno = async(req, res = response) => {

    const id = req.params.id;

    try {

        const planillaTurno = await PlanillaTurno.findById(id);

        if (!planillaTurno) {
            return res.status(404).json({
                ok: true,
                msg: 'Planilla-Turno no encontrada por id.'
            });
        }

        await Planilla.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Planilla-Turno eliminada.'
        });


    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar planilla-Turno, hable con el administrador.'
        });
    }

}

module.exports = {
    getPlanillaTurno,
    crearPlanillaTurno,
    actualizarPlanillaTurno,
    eliminarPlanillaTurno
}