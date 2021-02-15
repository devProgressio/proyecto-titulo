const { Schema, model } = require('mongoose');

const FaltaSchema = Schema({

    tipoFaltaId: {
        type: String,
        required: true
    },
    // quien recibe la falta.
    usuarioId: {
        type: String,
        required: true,
        unique: true
    },
    // quien asigna la falta.
    supervisorId: {
        type: String,
        required: true
    },
    // en que turno ocurrió la falta.
    turnoId: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    }
}, { collection: 'falta' });

FaltaSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Falta', FaltaSchema);