import { Routes } from '@angular/router';
import { DashboardComponent } from './core/components/modules/dashboard/dashboard.component';
import { UserComponent } from './core/components/modules/security/user/user.component';
import { LoginComponent } from './core/components/modules/login/login.component';
import { RolesComponent } from './core/components/modules/security/roles/roles.component';
import { CustomerComponent } from './core/components/modules/application/customer/customer.component';
import { AccountComponent } from './core/components/modules/application/account/account.component';
import { TransactionComponent } from './core/components/modules/application/transaction/transaction.component';
import { authGuard } from './core/admin-routes/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'users',
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
    data: { isLogged: true },
  },

];
