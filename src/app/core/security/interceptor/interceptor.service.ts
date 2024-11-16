import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SecurityService } from '../../services/security-service/security.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const interceptorService: HttpInterceptorFn = (req, next) => {

  console.log("interceptro ");
  const securityService = inject(SecurityService); // Inyecta el servicio
  const token = securityService.GetToken();


  // Clonar la solicitud y agregar el encabezado Authorization
  let authReq = req.clone({
    setHeaders: {
      Authorization: token ? `${token}` : '',
      Accept: 'application/json',
    }
  });
  
  console.log("request ", authReq);
  // Manejo de errores
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.log('Error 401');
        securityService.LogOff();
      }
      return throwError(() => error);
    })
  );
};
