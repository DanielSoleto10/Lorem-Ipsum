import { Component } from '@angular/core';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FirebaseService } from 'src/app/data/firebase.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private router: Router,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  goToInicio() {
    this.router.navigateByUrl('/home-agricultor');
  }
  
  goToCuenta() {
    this.router.navigateByUrl('/perfil');
  }
  
  goToNotificaciones() {
    this.router.navigateByUrl('/notificaciones');
  }

  async logout() {
    try {
      await this.authService.logout();
      // Changed from navigateRoot to navigate directly to login
      this.router.navigateByUrl('/auth/login', { replaceUrl: true });
    } catch (error) {
      console.error('Error during logout:', error);
      // Optionally show an error alert
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Hubo un problema al cerrar sesión',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}