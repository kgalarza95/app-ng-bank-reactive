import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'systembank',
        loadChildren: () => import('./core/admin-routes/admin.routes').then((adminRoutes) => adminRoutes.routes),
    },
    { path: '', redirectTo: '/systembank', pathMatch: 'full' },
];


/* 
const routes: Routes = [
    {
        path: 'jacobo',
        loadChildren: () => import('./core/admin-routes/admin.routes').then((adminRoutes) => adminRoutes.routes)
    }

    /*  {
         path: '',
         redirectTo: '/auth/login',
         pathMatch: 'full'
     }, 
      {
         path: 'auth',
         loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
     },
     {
         path: 'main',
         loadChildren: () => import('./main/main.module').then(m => m.MainModule),
         canActivate: [AuthGuardService]
     }, 
       {
          path: '**',
          redirectTo: '/auth/login',
          pathMatch: 'full'
      }, 
];
 */