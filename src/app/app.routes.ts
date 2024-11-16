import { Routes  } from '@angular/router';
import { LoggedGuard } from './core/security/guard/logged.guard';
import { AdminGuard } from './core/security/guard/admin.guard';


export const routes: Routes = [

    {
        path: 'auth',
        loadChildren: () => import('../app/features/auth/auth.module').then(m => m.AuthModule),
        canActivate:[LoggedGuard]
    },
    {
        path: 'administrator',
        loadChildren: () => import('../app/features/admin/admin.module').then(m => m.AdminModule),
        title: 'Administrador',
        canActivate: [AdminGuard],
        canLoad: [AdminGuard],
    },
    {
        path: '**',
        redirectTo:'auth'
    },
  // otras rutas aquí
];

