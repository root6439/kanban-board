import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { LoginService } from './login.service';
import { Login } from './shared/models/Login';

describe('LoginService', () => {
  let service: LoginService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LoginService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http.post sending parameters', fakeAsync(() => {
    let data: Login = {
      login: '123',
      senha: '1234',
    };
    spyOn(http, 'post');
    service.login(data);

    tick();

    expect(http.post).toHaveBeenCalledWith(
      `${environment.serverUrl}/login`,
      data
    );
  }));
});
