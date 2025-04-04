import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';

import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterModule],
})
export class LoginPage {
  loginForm: FormGroup;
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private firestore: Firestore
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
  
      try {
        const { correo, password } = this.loginForm.value;
        const cred = await this.authService.loginUser(correo, password);
        const uid = cred.user?.uid;
        if (!uid) {
          this.presentAlert('No se pudo obtener el UID del usuario.');
          return;
        }
  
        await this.redirigirSegunRol(uid);
  
      } catch (error: any) {
        this.errorMessage = this.parseFirebaseAuthError(error);
      } finally {
        this.isLoading = false;
      }
    }
  }
  

  async loginWithProvider(provider: string) {
    if (provider === 'google') {
      try {
        const cred = await this.authService.loginWithGoogle();
        const uid = cred.uid;

        if (!uid) {
          this.presentAlert('No se pudo obtener el UID del usuario.');
          return;
        }

        await this.redirigirSegunRol(uid);
      } catch (error) {
        console.error('Error con Google:', error);
        this.presentAlert('No se pudo iniciar sesión con Google.');
      }
    } else {
      this.presentAlert(`Proveedor ${provider} no implementado.`);
    }
  }

  async redirigirSegunRol(uid: string) {
    const userDocRef = doc(this.firestore, `Usuarios/${uid}`);
    const userSnap = await getDoc(userDocRef);
    const userData = userSnap.data();

    if (!userData || !userData['rol']) {
      this.presentAlert('No se encontró información del rol del usuario.');
      return;
    }

    const rol = userData['rol'];

    if (rol === 'agricultor') {
      this.navCtrl.navigateRoot('/home-agricultor');
    } else if (rol === 'comprador') {
      this.navCtrl.navigateRoot('/home-comprador');
    } else {
      this.presentAlert('Rol de usuario desconocido.');
    }
  }

  async forgotPassword() {
    const correo = this.loginForm.get('correo')?.value;
    if (!correo) {
      this.presentAlert('Ingresa tu correo para resetear contraseña');
      return;
    }
    try {
      await this.authService.resetPassword(correo);
      this.presentAlert(`Se envió un correo de recuperación a ${correo}`);
    } catch (error) {
      this.presentAlert('Error al enviar correo de recuperación');
    }
  }

  private parseFirebaseAuthError(error: any): string {
    if (error && error.code) {
      switch (error.code) {
        case 'auth/user-not-found':
          return 'Usuario no encontrado.';
        case 'auth/wrong-password':
          return 'Contraseña incorrecta.';
        case 'auth/invalid-email':
          return 'Correo inválido.';
        default:
          return 'Error al iniciar sesión: ' + error.code;
      }
    }
    return 'Error desconocido al iniciar sesión.';
  }

  private async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Atención',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
