// src/app/pages/usuario.page.ts
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../services/UsuarioService'; 
import { UsuarioModel } from '../interfaces/UsuarioModel';
import { Usuario } from '../interfaces/Usuario';

@Component({
  selector: 'app-usuario-page',
  templateUrl: './UsuarioPage.html',
  standalone: true,
  imports: [IonicModule, CommonModule] 
})
export class UsuarioPage {
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  guardarUsuario() {
    const usuario = new UsuarioModel('u1223', 'Lauras', 'laura1@email.com');
    
    this.usuarioService.crearUsuario(usuario.toObject())
      .then(() => console.log('Guardado'))
      .catch(err => console.error('Error al guardar', err));
  }

  

  cargarUsuarios() {
    this.usuarioService.obtenerTodos().subscribe(data => {
      this.usuarios = data;
    });
  }
}
