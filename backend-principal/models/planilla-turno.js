const { Schema, model } = require('mongoose');

const PlanillaTurnoSchema = Schema({

    planilla: {
        type: Schema.Types.ObjectId,
        ref: 'Planilla',
        required: true
    },
    fechaHoraInicio: {
        type: Date,
        required: true
    },
    fechaHoraTermino: {
        type: Date,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    }
}, { collection: 'planilla_turno' });

PlanillaTurnoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('PlanillaTurno', PlanillaTurnoSchema);