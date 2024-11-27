import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 
import { User, UserRequestDTO } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  private baseUrl: string = `${environment.apiUrl}/auth`; 
  private tokenSubject = new BehaviorSubject<string | null>(this.getStoredToken());
  token$: Observable<string | null> = this.tokenSubject.asObservable();
 

  constructor(private http: HttpClient,
    private cookieService: CookieService
  ) {}

  login(data:any): Observable<any> { 
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  register(user: UserRequestDTO): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user);
  }
   

  isAuthenticated(): boolean { 
    return !!this.getStoredToken();
  }

  setToken(token: string): void {
    this.cookieService.set('jwtToken', token, { secure: true, sameSite: 'Strict', path: '/' }); 
    this.tokenSubject.next(token);
  }
 
  getStoredToken(): string | null {
    return this.cookieService.get('jwtToken');
  }
 
  clearToken(): void {
    this.cookieService.delete('jwtToken', '/');
    this.tokenSubject.next(null);
  }

   
}
