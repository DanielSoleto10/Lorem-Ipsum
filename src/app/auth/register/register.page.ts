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
  isLoading = false;

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
      rol: ['', [Validators.required]] 
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
  
      const { nombres, apellidos, correo, password, rol } = this.registerForm.value;
  
      try {
        const uid = await this.authService.registerUser(correo, password);
  
        await this.firebaseService.set('Usuarios', uid, {
          uid,
          nombres,
          apellidos,
          correo,
          rol
        });
  
        this.presentAlert('Usuario registrado exitosamente');
        this.navCtrl.navigateRoot('/auth/login');
      } catch (error: any) {
        console.error('Error al registrar usuario:', error);
        this.errorMessage = this.parseFirebaseAuthError(error);
      } finally {
        this.isLoading = false;
      }
    }
  }
  

  async registerWithGoogle() {
    try {
      const userData = await this.authService.loginWithGoogle();

      const { uid, email, displayName } = userData;

      // Separar nombre y apellido
      const [nombres, ...rest] = displayName?.split(' ') || [''];
      const apellidos = rest.join(' ') || '';

     
      const rol = 'agricultor';

      await this.firebaseService.set('Usuarios', uid, {
        uid,
        nombres,
        apellidos,
        correo: email,
        rol
      });

      this.presentAlert('Registro exitoso con Google');
      this.navCtrl.navigateRoot('/home-agricultor'); 

    } catch (error) {
      console.error('Error con Google:', error);
      this.presentAlert('Error al registrarse con Google');
    }
  }

  private parseFirebaseAuthError(error: any): string {
    if (error && error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          return 'El correo ya está en uso.';
        case 'auth/invalid-email':
          return 'Correo inválido.';
        default:
          return 'Error: ' + error.code;
      }
    }
    return 'Error desconocido';
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
