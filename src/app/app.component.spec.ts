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

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let service: LoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [LoginService, HttpClient],
    }).compileComponents();

    service = TestBed.inject(LoginService);
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call localStorage.setItem', fakeAsync(() => {
    spyOn(service, 'login').and.returnValue(of('123'));
    spyOn(window.localStorage, 'setItem');

    app.login();
    tick();

    expect(window.localStorage.setItem).toHaveBeenCalledWith('token', '123');
  }));
});
