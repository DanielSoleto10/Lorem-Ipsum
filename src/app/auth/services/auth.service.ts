import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from '@angular/fire/auth';
import { FirebaseService } from 'src/app/data/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private firebaseService: FirebaseService
  ) {}

  // Crear usuario en Auth, devolver uid
  async registerUser(correo: string, password: string): Promise<string> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, correo, password);
    return userCredential.user.uid;
  }

  // Iniciar sesión
  async loginUser(correo: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, correo, password);
  }

  // Reset password
  async resetPassword(correo: string): Promise<void> {
    await sendPasswordResetEmail(this.auth, correo);
  }

  // Cerrar sesión
  async logout(): Promise<void> {
    return signOut(this.auth);
  }
}
