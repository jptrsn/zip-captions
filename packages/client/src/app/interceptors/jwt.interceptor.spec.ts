import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { StorageService } from '../services/storage.service';
import { JwtInterceptor } from './jwt.interceptor';

describe('JwtInterceptor', () => {
  const intercept = (token: string | null) => {
    TestBed.configureTestingModule({ providers: [{ provide: StorageService, useValue: { get: jest.fn(() => token) } }] });
    const request = new HttpRequest('GET', '/v1/user/validate');
    const next = jest.fn((req: HttpRequest<unknown>) => req as never) as unknown as HttpHandlerFn & jest.Mock;
    TestBed.runInInjectionContext(() => JwtInterceptor(request, next));
    return { request, forwarded: next.mock.calls[0][0] as HttpRequest<unknown> };
  };

  it('adds the stored token as a bearer Authorization header', () => {
    const { forwarded } = intercept('jwt-token');
    expect(forwarded.headers.get('Authorization')).toBe('Bearer jwt-token');
  });

  it('does not change the original request', () => {
    const { request } = intercept('jwt-token');
    expect(request.headers.has('Authorization')).toBe(false);
  });

  it('sends the request unchanged when there is no token', () => {
    const { request, forwarded } = intercept(null);
    expect(forwarded).toBe(request);
  });
});
