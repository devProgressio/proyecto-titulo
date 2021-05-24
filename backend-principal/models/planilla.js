const { Schema, model } = require('mongoose');

const PlanillaSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    glosa: {
        type: String,
        required: false
    },
    // estado activa.
    estado: {
        type: Boolean,
        default: true
    },
    // fecha que va a iniciar la planilla. 
    fecha: {
        type: Date,
        required: true
    },
}, { collection: 'planilla' });

PlanillaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Planilla', PlanillaSchema);