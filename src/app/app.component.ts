import { LoginService } from './login.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Login } from './shared/models/Login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  data: Login = {
    login: 'letscode',
    senha: 'lets@123',
  };

  private login$: Subscription = new Subscription();

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.login$ = this.loginService
      .login(this.data)
      .subscribe((resp: string) => {
        localStorage.setItem('token', resp);
      });
  }

  ngOnDestroy(): void {
    this.login$.unsubscribe();
  }
}
