const { Schema, model } = require('mongoose');

const NoticiaSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    fechaHoraCreacion: {
        // Esta fecha hora deberia ser automatica al grabar la fecha.
        type: Date,
        default: new Date()
    },
    img: {
        type: String
    },
    importancia: {
        type: Number,
        default: 0
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    activaHasta: {
        type: Date,
        requiered: true
    }
}, { collection: 'noticia' });

NoticiaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Noticia', NoticiaSchema);