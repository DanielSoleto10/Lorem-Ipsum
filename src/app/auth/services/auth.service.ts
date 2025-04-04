import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  async registerUser(correo: string, password: string): Promise<string> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, correo, password);
    return userCredential.user.uid;
  }

  async loginUser(correo: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, correo, password);
  }

  async resetPassword(correo: string): Promise<void> {
    await sendPasswordResetEmail(this.auth, correo);
  }

  async logout(): Promise<void> {
    return signOut(this.auth);
  }

  async loginWithGoogle(): Promise<{ uid: string; email: string; displayName: string }> {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    const user = result.user;

    return {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || ''
    };
  }
}
