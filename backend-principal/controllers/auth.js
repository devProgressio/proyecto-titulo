const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        // Generar un TOKEN -JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            msg: 'Contraseña válida',
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);
        console.log({ name, email, picture });

        const usuarioDB = await Usuario.findOne({ email });
        console.log('usuarioDB' + usuarioDB);
        let usuario;

        if (!usuarioDB) {
            // Si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true

            })
            console.log('entro a no existe');
            console.log(usuario);
        } else {
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;
            // SI LE BORRO LA CONTRASEÑA, solo podra acceder por la cuenta de google.
            usuario.password = '@@@'

            console.log('entro a existe');
            console.log(usuario);
        }

        //Guarda en BD
        await usuario.save();

        // Generar un TOKEN -JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {

        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto xx'
        })
    }
}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generar un TOKEN -JWT
    const token = await generarJWT(uid);

    // Obtener el usuario por uid
    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        token,
        usuario
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}