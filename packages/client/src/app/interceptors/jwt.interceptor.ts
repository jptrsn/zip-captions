import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export const JwtInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const storage = inject(StorageService);
  const token = storage.get('token');
  if (token) {
    const modifiedReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`)})
    return next(modifiedReq);
  }
  return next(req)
}
