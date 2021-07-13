import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Product } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/v1/products';
  constructor(
    private httpClient: HttpClient
  ) { }

  getProductsList(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}`);
  }

  addNewProduct(product: Product): Observable<object> {
    return this.httpClient.post(`${this.baseUrl}`, product);
  }

  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/${id}`);
  }

  updateProduct(id: number, product: Product): Observable<object> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<object> {
    return this.httpClient.delete<Product>(`${this.baseUrl}/${id}`);
  }
}
