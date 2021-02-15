const { Schema, model } = require('mongoose');

const TipoFaltaSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    gravedad: {
        type: String,
        required: true
    },
}, { collection: 'tipo-falta' });

TipoFaltaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('TipoFalta', TipoFaltaSchema);