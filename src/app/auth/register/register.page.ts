import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from 'src/app/data/firebase.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterModule],
})
export class RegisterPage {
  registerForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {
    this.registerForm = this.fb.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      const { nombres, apellidos, correo, password } = this.registerForm.value;
      try {
        // Crear usuario en Auth => uid
        const uid = await this.authService.registerUser(correo, password);

        // Guardar en Firestore
        await this.firebaseService.set('Usuarios', uid, {
          uid,
          nombres,
          apellidos,
          correo
        });

        this.presentAlert('Usuario registrado exitosamente');
        this.navCtrl.navigateRoot('/auth/login');
      } catch (error: any) {
        console.error('Error al registrar usuario:', error);
        this.errorMessage = this.parseFirebaseAuthError(error);
      }
    }
  }

  private parseFirebaseAuthError(error: any): string {
    if (error && error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          return 'El correo ya está en uso. Intenta recuperar tu contraseña o usa otro.';
        case 'auth/invalid-email':
          return 'Correo inválido.';
        default:
          return 'Error al registrar usuario: ' + error.code;
      }
    }
    return 'Error desconocido al registrar.';
  }

  private async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Registro',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
