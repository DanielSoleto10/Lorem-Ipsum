import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private router: Router) {}

  goToInicio() {
    this.router.navigateByUrl('/home-agricultor');
  }
  
  goToCuenta() {
    this.router.navigateByUrl('/perfil'); 
  }
  
  goToNotificaciones() {
    this.router.navigateByUrl('/notificaciones'); 
  }
}
