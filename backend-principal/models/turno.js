const { Schema, model } = require('mongoose');

const TurnoSchema = Schema({

    inicio: {
        type: Date,
        required: true
    },
    termino: {
        type: Date,
        required: true
    },
}, { collection: 'turno' });

TurnoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Turno', TurnoSchema);