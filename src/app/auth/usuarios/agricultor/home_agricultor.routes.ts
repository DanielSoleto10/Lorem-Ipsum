import { Routes } from '@angular/router';

// Solo una ruta con path: '' que carga el componente HomeAgricultorPage
export const homeAgricultorRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home-agricultor.page').then(m => m.HomeAgricultorPage)
  }
];
