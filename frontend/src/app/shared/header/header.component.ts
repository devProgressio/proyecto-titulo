import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl'],
})
export class HeaderComponent {

  public imgUrl = '';

  constructor(private usuarioService: UsuarioService) {

    this.imgUrl = usuarioService.usuario.imagenUrl;
  }

  logout() {
    this.usuarioService.logout();
  }
}
