import { Routes } from '@angular/router';

export const homeCompradorRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home-comprador.page').then(m => m.HomeCompradorPage)
  }
];
