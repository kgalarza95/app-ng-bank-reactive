import { Routes } from '@angular/router';
import { DashboardComponent } from '../components/modules/dashboard/dashboard.component';
import { LoginComponent } from '../components/modules/login/login.component';
import { UserComponent } from '../components/modules/security/user/user.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'project',
        component: UserComponent
      }
    ]
  },

  {
    path: 'login',
    component: LoginComponent,
    data: { isLogged: true },
  },

];
