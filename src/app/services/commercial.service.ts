import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommercialService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  register(code: string, name: string, password: string) {
    return this.http.put(`${this.apiUrl}/commercial`, {
      name,
      code,
      password,
    });
  }

  login(code: string, password: string) {
    return this.http.put(`${this.apiUrl}/commercial`, {
      code,
      password,
    });
  }
}
