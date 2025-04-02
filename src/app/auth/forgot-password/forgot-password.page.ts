import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterModule],
})
export class ForgotPasswordPage {
  forgotForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {
    this.forgotForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  async onSubmit() {
    if (this.forgotForm.valid) {
      const { correo } = this.forgotForm.value;
      try {
        await this.authService.resetPassword(correo);
        this.presentAlert('Se envió un enlace a tu correo para restablecer la contraseña.');
      } catch (error) {
        this.errorMessage = 'Error al enviar correo de recuperación.';
      }
    }
  }

  private async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Recuperar Contraseña',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
