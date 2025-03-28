// src/app/services/usuario.service.ts
import { Injectable } from '@angular/core';
import { FirebaseService } from './FirebaseService';
import { Usuario } from '../interfaces/Usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly path = 'usuarios';

  constructor(private firebase: FirebaseService) {}

  crearUsuario(usuario: Usuario) {
    return this.firebase.set<Usuario>(this.path, usuario.uid, usuario);
  }

  obtenerUsuario(uid: string): Observable<Usuario | undefined> {
    return this.firebase.get<Usuario>(this.path, uid);
  }

  obtenerTodos(): Observable<Usuario[]> {
    return this.firebase.getAll<Usuario>(this.path);
  }

  
  eliminarUsuario(uid: string) {
    return this.firebase.delete(this.path, uid);
  }
}
