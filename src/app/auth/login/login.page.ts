import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { correo, password } = this.loginForm.value;
      try {
        await this.authService.loginUser(correo, password);
        console.log('Usuario autenticado correctamente');
        // Redirigir según tu lógica, aquí a /home-agricultor
        this.navCtrl.navigateRoot('/home-agricultor');
      } catch (error: any) {
        console.error('Error al iniciar sesión:', error);
        this.errorMessage = this.parseFirebaseAuthError(error);
      }
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

  loginWithProvider(provider: string) {
    console.log(`Login con ${provider} (no implementado)`);
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
