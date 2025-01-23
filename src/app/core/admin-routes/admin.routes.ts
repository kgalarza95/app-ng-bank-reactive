import { Routes } from '@angular/router';
import { DashboardComponent } from '../components/modules/dashboard/dashboard.component';
import { LoginComponent } from '../components/modules/login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        /* children: [
          {
            path: '',
            component: ContentComponent,
            outlet: 'header'
          },
          {
            path: '',
            component: ContentComponent,
            outlet: 'left-side'
          },
          {
            path: '',
            component: HomeComponent,
          },
          {
            path: '',
            component: ContentComponent,
            outlet: 'right-side'
          },
          {
            path: '',
            component: ContentComponent,
            outlet: 'footer'
          }
        ] */
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
    }
];
