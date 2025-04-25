import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterModule } from '@angular/router';
import { FooterComponent } from 'src/app/shared/layout/footer.component';
import { CardsComponent } from 'src/app/shared/layout/cards/cards.component';

@Component({
  selector: 'app-home-agricultor',
  templateUrl: './home-agricultor.page.html',
  styleUrls: ['./home-agricultor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FooterComponent, CardsComponent]
})
export class HomeAgricultorPage {
  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  async logout() {
    await this.authService.logout();
    this.navCtrl.navigateRoot('/auth/login');
  }
}
