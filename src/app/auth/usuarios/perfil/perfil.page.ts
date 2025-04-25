import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FirebaseService } from 'src/app/data/firebase.service';
import { Usuario } from 'src/app/interfaces/Usuario';
import { RouterModule } from '@angular/router';
import { getAuth } from '@angular/fire/auth';
import { FooterComponent } from 'src/app/shared/layout/footer.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule , FooterComponent],
})
export class PerfilPage implements OnInit {
  usuario: Usuario | null = null;

  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    await this.cargarPerfil();
  }

  async cargarPerfil() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const data = await this.firebaseService.getOnce<Usuario>('Usuarios', user.uid);
    if (data) {
      this.usuario = data;
    } else {
      this.presentAlert('No se encontró el usuario en Firestore.');
    }
  }

  async logout() {
    await this.authService.logout();
    this.navCtrl.navigateRoot('/auth/login');
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
