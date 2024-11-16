import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const uriDecoderGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const params = route.params;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const paramValue = params[key];
      try {
        // Intentar decodificar el parámetro
        const decodedValue = decodeURIComponent(paramValue);
        // Si necesita decodificar usando atob, hágalo aquí
        if (!isValidBase64(decodedValue)) {
            throw new Error('Invalid Base64 string');
          }
        atob(decodedValue);
      } catch (e) {
        console.error("Error al decodificar el parámetro URI:", e);
        // Redirigir a una página de error o manejar el error adecuadamente
        // return router.parseUrl('administrator/suppliers');
      }
    }
  }

  function isValidBase64(str: string): boolean {
    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  }
  return true; // Permitir la navegación si todos los parámetros son válidos
};
