import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { MenuItem } from 'primeng/api';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.styl'],
})
export class SidebarComponent implements OnInit {
  public imgUrl: string;
  public menuItems: any[];

  constructor(
    private sidebarService: SidebarService,
    private usuarioService: UsuarioService
  ) {
    this.menuItems = sidebarService.menu;
    this.imgUrl = usuarioService.usuario.imagenUrl;
  }

  ngOnInit(): void {}
}
