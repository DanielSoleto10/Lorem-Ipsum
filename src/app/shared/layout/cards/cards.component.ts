import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
    cards = [
        {
          title: 'Clima',
          subtitle: 'Estado del tiempo actual',
          image: 'assets/icon/clima.png',
          path: '/usuarios/agricultor/clima'
        },
        {
          title: 'Luna',
          subtitle: 'Posición lunar y fases',
          image: 'assets/icon/luna.png',
          path: '/usuarios/agricultor/luna'
        },
        {
          title: 'Pesticidas',
          subtitle: 'Control de plagas y productos',
          image: 'assets/icon/pesticidas.png',
          path: '/usuarios/agricultor/pesticidas'
        },
        {
          title: 'Ventas',
          subtitle: 'Historial y nuevos pedidos',
          image: 'assets/icon/ventas.png',
          path: '/usuarios/agricultor/ventas'
        },
        {
          title: 'Consejos',
          subtitle: 'Recomendaciones del campo',
          image: 'assets/icon/consejos.png',
          path: '/usuarios/agricultor/consejos'
        }
      ];
      
}
