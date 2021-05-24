import { environment } from '../environments/environment';

const base_url = environment.base_url;

export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string,
    ) {}

    get imagenUrl() {

        // si es una img desde google, ya viene construida.
        if (this.img && this.img.includes('https')) {
            return this.img;
        }

        const image = base_url.concat('/upload/usuarios/').concat(this.img);
        const noImage = base_url.concat('/upload/usuarios/no-image');
        return this.img ? image : noImage;
    }
}
