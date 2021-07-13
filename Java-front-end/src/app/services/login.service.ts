import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';

import { Admin } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/api/v2/admin';
  constructor(
    private router: Router,
    private httpClient: HttpClient,
  ) {}

  isAdminLoggedIn(): void {
    this.router.navigateByUrl('/products');
  }

  logout(): void {
    this.router.navigateByUrl('/admin-login');
  }

  getUserById(userId: number): Observable<Admin>{
    return this.httpClient.get<Admin>(`${this.baseUrl}/${userId}`);
  }

  getAllUsers(): Observable<Admin[]>{
    return this.httpClient.get<Admin[]>(`${this.baseUrl}`);
  }

  updateAdmin(userId: number, admin: Admin): Observable<object>{
    return this.httpClient.put<Admin>(`${this.baseUrl}/${userId}`, admin);
  }
}
