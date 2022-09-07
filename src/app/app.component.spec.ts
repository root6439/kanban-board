import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let service: LoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MatToolbarModule],
      declarations: [AppComponent],
      providers: [LoginService, HttpClient],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should set item in localStorage', fakeAsync(() => {
    service = TestBed.inject(LoginService);
    spyOn(service, 'login').and.returnValue(of('123'));

    app.login();
    tick();

    expect(localStorage.getItem('token')).toBe('123');
  }));
});
