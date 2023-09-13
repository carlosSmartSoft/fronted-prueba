import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.apiUrl}/service`);
  }
}
