import { Login } from './shared/models/Login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(data: Login): Observable<string> {
    return this.http.post<string>(`${environment.serverUrl}/login`, data);
  }
}
