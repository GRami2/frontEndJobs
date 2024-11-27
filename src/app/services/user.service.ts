import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserRequestDTO } from '../models/user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}/user`;
  private userSubject = new BehaviorSubject<any>(this.getStoredUser());// Loading the token from cookies
  user$: Observable<any> = this.userSubject.asObservable(); //Observable to listen for token changes

  constructor(private http: HttpClient,
    private cookieService: CookieService) {}
 
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }
 
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }
  
  updateUser(id: number, user: UserRequestDTO): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update/${id}`, user);
  }
  
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  setUser(user: any): void {
    this.cookieService.set('user', JSON.stringify(user), { secure: true, sameSite: 'Strict', path: '/' });
    this.userSubject.next(user);
  }

  getStoredUser(): any {
    const user = this.cookieService.get('user');
    return user ? JSON.parse(user) : null;
  }
 
  clearUser(): void {
    this.cookieService.delete('user', '/');
    this.userSubject.next(null);
  }
}