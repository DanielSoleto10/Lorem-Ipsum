import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { WeatherService } from 'src/app/auth/services/weather.service';

@Component({
  selector: 'app-clima',
  standalone: true,
  templateUrl: './clima.page.html',
  styleUrls: ['./clima.page.scss'],
  imports: [IonicModule, CommonModule] // ✅ aquí
})
export class ClimaPage {
  ciudadSeleccionada = '';
  clima: any;

  constructor(private weatherService: WeatherService) {}

  obtenerClima(ciudad: string) {
    this.ciudadSeleccionada = ciudad;
    this.weatherService.getWeather(ciudad).subscribe(data => {
      this.clima = data;
    });
  
  }
} 