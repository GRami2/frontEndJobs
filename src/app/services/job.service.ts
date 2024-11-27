import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from '../models/job';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {
   private apiUrl: string = `${environment.apiUrl}/job`;

  constructor(private http: HttpClient) {}
 
  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/all`);
  }
 
  getJobById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get/${id}`).pipe(
      catchError(this.handleError)
    );
  }
 
  addJob(job: Job): Observable<Job> {
    return this.http.post<Job>(`${this.apiUrl}/create`, job).pipe(
      catchError(this.handleError)
    );
  }
 
  updateJob(id: number, job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.apiUrl}/update/${id}`, job).pipe(
      catchError(this.handleError)
    );
  }
 
  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Handle errors
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}