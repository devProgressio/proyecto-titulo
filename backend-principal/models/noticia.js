const { Schema, model } = require('mongoose');

const NoticiaSchema = Schema({

    nombre: {
        type: String,
        required: true
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
        ref: 'Usuario'
    }
}, { collection: 'noticia' });

NoticiaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Noticia', NoticiaSchema);