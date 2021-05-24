const { response } = require("express");
const Planilla = require('../models/planilla');

const getPlanillas = async(req, res = response) => {

    const planillas = await Planilla.find();

    try {

        res.json({
            ok: true,
            planillas
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un problema al listar planullas. Hable con el administrador.'
        })
    }

}

const crearPlanilla = async(req, res = response) => {

    const planilla = new Planilla(req.body);

    try {

        const planillaDB = await planilla.save();

        res.json({
            ok: true,
            msg: planillaDB
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        })
    }

}

const actualizarPlanilla = async(req, res = response) => {

    const id = req.params.id;
    console.log(id);

    try {

        const planilla = await Planilla.findById(id);
        console.log(id);
        if (!planilla) {
            return res.status(404).json({
                ok: true,
                msg: 'Planilla no encontrada por id'
            });
        }

        const cambiosPlanilla = {
            ...req.body
        }

        const planillaActualizada = await Planilla.findByIdAndUpdate(id, cambiosPlanilla, { new: true })

        res.json({
            ok: true,
            planilla: planillaActualizada
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar planilla, hable con el administrador.'
        })
    }

}

const eliminarPlanilla = async(req, res = response) => {

    const id = req.params.id;

    try {

        const planilla = await Planilla.findById(id);

        if (!planilla) {
            return res.status(404).json({
                ok: true,
                msg: 'Planilla no encontrada por id.'
            });
        }

        await Planilla.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Planilla fue eliminada.'
        });


    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar planilla, hable con el administrador.'
        });
    }

}

module.exports = {
    getPlanillas,
    crearPlanilla,
    actualizarPlanilla,
    eliminarPlanilla
}