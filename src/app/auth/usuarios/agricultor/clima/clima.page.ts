import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/auth/services/weather.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { FooterComponent } from 'src/app/shared/layout/footer.component';
registerLocaleData(localeEs);

@Component({
  selector: 'app-clima',
  standalone: true,
  templateUrl: './clima.page.html',
  styleUrls: ['./clima.page.scss'],
  imports: [IonicModule, CommonModule, FooterComponent]
})
export class ClimaPage implements OnInit {
  ciudadSeleccionada = '';
  clima: any;
  pronostico: any[] = [];
  horasHoy: any[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.actualizarDatos();
    setInterval(() => {
      this.actualizarDatos();
    }, 300000); // cada 5 minutos
  }

  ionViewWillEnter() {
    this.actualizarDatos();
  }

  actualizarDatos() {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      this.weatherService.getWeatherByCoords(lat, lon).subscribe(data => {
        this.clima = data;
        this.ciudadSeleccionada = data.name;
      });

      this.weatherService.getForecastByCoords(lat, lon).subscribe(data => {
        this.pronostico = this.agruparPorDia(data.list);
        this.horasHoy = this.extraerHorasDeHoy(this.pronostico);
      });
    });
  }

  agruparPorDia(lista: any[]): any[] {
    const dias: { [fecha: string]: any[] } = {};

    lista.forEach(item => {
      const fechaCompleta = new Date(item.dt_txt);
      const clave = fechaCompleta.toISOString().split('T')[0];

      if (!dias[clave]) dias[clave] = [];
      item._fecha = fechaCompleta;
      dias[clave].push(item);
    });

    return Object.entries(dias).map(([clave, datos]) => ({
      fecha: datos[0]._fecha,
      datos
    }));
  }

  extraerHorasDeHoy(pronostico: any[]): any[] {
    const hoy = new Date().toDateString();
    const hoyItems = pronostico.find(p => new Date(p.fecha).toDateString() === hoy);
    return hoyItems?.datos ?? [];
  }

  capitalizarPrimera(texto: string): string {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  obtenerMaxTemp(lista: any[]): number {
    return Math.round(Math.max(...lista.map(d => d.main.temp_max ?? d.main.temp)));
  }

  obtenerMinTemp(lista: any[]): number {
    return Math.round(Math.min(...lista.map(d => d.main.temp_min ?? d.main.temp)));
  }

  obtenerPromedioHumedad(lista: any[]): number {
    const total = lista.reduce((acc, d) => acc + d.main.humidity, 0);
    return Math.round(total / lista.length);
  }

  verDetalleDia(dia: any) {
    alert(`Día: ${this.capitalizarPrimera((dia.fecha as Date).toLocaleDateString('es-ES', { weekday: 'long' }))}`);
  }
}