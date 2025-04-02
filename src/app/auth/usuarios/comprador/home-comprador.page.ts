import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-comprador',
  templateUrl: './home-comprador.page.html',
  styleUrls: ['./home-comprador.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class HomeCompradorPage {
  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  async logout() {
    await this.authService.logout();
    this.navCtrl.navigateRoot('/auth/login');
  }
}
