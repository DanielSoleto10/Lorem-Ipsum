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

  goToClima() {
    console.log('Accediendo a Clima...');
    this.router.navigateByUrl('/usuarios/agricultor/clima');
  }
  
  goToPesticidas() {
    this.router.navigateByUrl('/usuarios/agricultor/pesticidas');
  }

  goToVentas() {
    this.router.navigateByUrl('/usuarios/agricultor/ventas');
  }

  goToLuna() {
    this.router.navigateByUrl('/usuarios/agricultor/luna');
  }
}
