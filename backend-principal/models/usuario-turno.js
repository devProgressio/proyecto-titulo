const { Schema, model } = require('mongoose');

const UsuarioTurnoSchema = Schema({

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    planillaTurno: {
        type: Schema.Types.ObjectId,
        ref: 'PlanillaTurno',
        required: true,
        // unique: true
    }
}, { collection: 'usuario_turno' });

UsuarioTurnoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('UsuarioTurno', UsuarioTurnoSchema);