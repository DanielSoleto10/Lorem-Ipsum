import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FooterComponent } from 'src/app/shared/layout/footer.component';
import { LunaService } from 'src/app/auth/services/luna.service';

@Component({
  selector   : 'app-luna',
  standalone : true,
  templateUrl: './luna.page.html',
  styleUrls  : ['./luna.page.scss'],
  imports    : [IonicModule, CommonModule, FooterComponent]
})
export class LunaPage implements OnInit {

  ciudadActual = '';
  datosLuna: any;             // respuesta de la API

  constructor(private lunaSrv: LunaService) {}

  ngOnInit(): void {
    this.actualizarDatos();
    // refresco automático cada 30 min
    setInterval(() => this.actualizarDatos(), 30 * 60_000);
  }

  private actualizarDatos(): void {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude: lat, longitude: lon } = pos.coords;

      // obtenemos nombre aproximado de ciudad con reverse-geocoding de navegador
      this.ciudadActual = `Lat ${lat.toFixed(2)} / Lon ${lon.toFixed(2)}`;

      this.lunaSrv.getLunaByCoords(lat, lon).subscribe(resp => {
        this.datosLuna = resp;
      });
    });
  }
}
