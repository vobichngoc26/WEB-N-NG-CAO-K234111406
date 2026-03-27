import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>('assets/customer.json');
  }

  get_all_customers(): Observable<any[]> {
    return this.getCustomers();
  }

  filter_customer_by_age(fromAge: number, toAge: number): Observable<any[]> {
    return this.getCustomers().pipe(
      map(customers =>
        customers.filter(c => c.age >= fromAge && c.age <= toAge)
      )
    );
  }

  get_customer_detail(id: string): Observable<any | null> {
    return this.getCustomers();
  }
}
