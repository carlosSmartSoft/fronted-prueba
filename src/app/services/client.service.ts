import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  create(code: string, fullName: string, passwordAccess: string) {
    return this.http.put(`${this.apiUrl}/client`, {
      fullName,
      code,
      passwordAccess,
    });
  }

  update(
    code: string,
    fullName: string,
    passwordAccess: string,
    city: string,
    income: string,
    age: string
  ) {
    console.log(code, fullName, passwordAccess, city, income, age);
    return this.http.put(`${this.apiUrl}/client`, {
      code,
      fullName,
      passwordAccess,
      city,
      income,
      age,
    });
  }

  getAll() {
    return this.http.get(`${this.apiUrl}/client`);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/client/${id}`);
  }
}
