import { CanMatchFn } from '@angular/router';
import { SecurityService } from '../../services/security-service/security.service';
import { inject } from '@angular/core';

export const authGuard: CanMatchFn = (route, state) => {
  const securityService = inject(SecurityService);
  return !!securityService.GetToken();
};
