import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'home-agricultor',
    loadChildren: () =>
      import('src/app/auth/usuarios/agricultor/home_agricultor.routes').then(m => m.homeAgricultorRoutes)
  },
  {
    path: 'home-comprador',
    loadChildren: () =>
      import('src/app/auth/usuarios/comprador/home_comprador.routes').then(m => m.homeCompradorRoutes)
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('src/app/auth/usuarios/perfil/perfil.routes').then(m => m.perfilRoutes)
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];