import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-agricultor',
  templateUrl: './home-agricultor.page.html',
  styleUrls: ['./home-agricultor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class HomeAgricultorPage {
  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  goToClima() { console.log('Ir a Clima'); }
  goToVentas() { console.log('Ir a Ventas'); }
  goToPesticidas() { console.log('Ir a Pesticidas'); }
  goToConsejos() { console.log('Ir a Consejos'); }

  async logout() {
    await this.authService.logout();
    this.navCtrl.navigateRoot('/auth/login');
  }
}
