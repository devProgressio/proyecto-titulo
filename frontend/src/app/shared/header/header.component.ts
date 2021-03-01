import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent {
  
  constructor(private usuarioService: UsuarioService) { }

    logout() {
        this.usuarioService.logout();
    }

}
