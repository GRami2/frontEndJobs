import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sector } from '../models/sector';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  private baseUrl: string = `${environment.apiUrl}/sector`;

  constructor(private http: HttpClient) {}
 
  createSector(sector: Sector): Observable<Sector> {console.log(sector)
    return this.http.post<Sector>(`${this.baseUrl}/create`, sector);
  }
 
  getAllSectors(): Observable<Sector[]> {
    return this.http.get<Sector[]>(`${this.baseUrl}/all`);
  }
 
  getSectorById(id: number): Observable<Sector> {
    return this.http.get<Sector>(`${this.baseUrl}/sector/${id}`);
  }
 
  updateSector(id: number, sector: Sector): Observable<Sector> {
    return this.http.put<Sector>(`${this.baseUrl}/update/${id}`, sector);
  }
 
  deleteSector(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
