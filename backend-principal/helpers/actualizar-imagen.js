const fs = require('fs');

const Noticia = require('../models/noticia');
const Usuario = require('../models/usuario');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        // Borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';
    switch (tipo) {
        case 'noticias':
            const noticia = await Noticia.findById(id);
            if (!noticia) {
                console.log('No es una noticia por id');
                return false;
            }

            pathViejo = `./upload/noticias/${ noticia.img}`;
            borrarImagen(pathViejo);

            noticia.img = nombreArchivo;
            await noticia.save();
            return true;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No es una usuario por id');
                return false;
            }

            pathViejo = `./upload/usuarios/${ usuario.img}`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

        default:
            break;
    }
}

module.exports = {
    actualizarImagen
}