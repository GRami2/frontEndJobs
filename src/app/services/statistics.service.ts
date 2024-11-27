import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService { 
  private apiUrl: string = `${environment.apiUrl}/stats`;

  constructor(private httpClient: HttpClient) { }

  getStats(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl);
  }
}
