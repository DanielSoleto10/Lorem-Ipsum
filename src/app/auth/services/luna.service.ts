import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface IpGeoAstronomyResponse {
  moonrise:        string;
  moonset:         string;
  moon_phase:      string;
  moon_illumination: string;  // porcentaje
  moon_distance:   string;    // km
  moon_altitude:   string;    // grados
  moon_age:        string;    // días desde luna nueva
}

@Injectable({ providedIn: 'root' })
export class LunaService {
  // 🔁  CREA tu propia key gratis en https://app.ipgeolocation.io
  private apiKey = '3016ed299e8f4351a207d7cdd46de964';
  private apiUrl = 'https://api.ipgeolocation.io/astronomy';

  constructor(private http: HttpClient) {}

  /** Datos astronómicos de la luna para lat/lon actuales */
  getLunaByCoords(lat: number, lon: number): Observable<IpGeoAstronomyResponse> {
    return this.http.get<IpGeoAstronomyResponse>(
      `${this.apiUrl}?apiKey=${this.apiKey}&lat=${lat}&long=${lon}&lang=es`
    ).pipe(
      // Las propiedades vienen en inglés; aquí no transformamos nada, solo
      // forzamos el tipo genérico para que el resto del código sea más cómodo.
      map(r => r)
    );
  }
}
