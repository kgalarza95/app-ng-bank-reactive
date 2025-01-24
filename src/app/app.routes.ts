import { Routes } from '@angular/router';
import { DashboardComponent } from './core/components/modules/dashboard/dashboard.component';
import { UserComponent } from './core/components/modules/security/user/user.component';
import { LoginComponent } from './core/components/modules/login/login.component';
import { RolesComponent } from './core/components/modules/security/roles/roles.component';
import { CustomerComponent } from './core/components/modules/application/customer/customer.component';
import { AccountComponent } from './core/components/modules/application/account/account.component';
import { TransactionComponent } from './core/components/modules/application/transaction/transaction.component';
import { authGuard } from './core/admin-routes/auth.guard';

/* export const routes: Routes = [
    {
        path: 'systembank',
        loadChildren: () => import('./core/admin-routes/admin.routes').then((adminRoutes) => adminRoutes.routes),
    },
    { path: '', redirectTo: '/systembank', pathMatch: 'full' },
]; */

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'usuarios',
        component: UserComponent
      },
      {
        path: 'roles',
        component: RolesComponent
      },

      {
        path: 'customer',
        component: CustomerComponent
      },
      {
        path: 'account',
        component: AccountComponent
      },
      {
        path: 'transaction',
        component: TransactionComponent
      }
    ]
  },

  {
    path: 'login',
    component: LoginComponent,
    //canActivate: [adminGuard],
    data: { isLogged: true },
    /* children: [
        {
            path: '',
            component: LoginComponent,
            data: { isCurrent: true }
        }
    ] */
  },

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