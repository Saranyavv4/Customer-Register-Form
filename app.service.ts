import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private appUrl = 'https://localhost:44370/api/Customer/CreateCustomer'; 

  constructor(private http: HttpClient) { }

  createCustomer(customerData: any): Observable<any> {
    return this.http.post<any>(this.appUrl, customerData);
  }
  getAllCustomer(): Observable<any>{
    return this.http.get<any>("https://localhost:44370/api/Customer/GetAllCustomer");
  }
  deleteCustomer(id: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:44370/api/Customer/DeleteCustomer/${id}`);
  }
  updateCustomer(payload:any): Observable<any>{
    return this.http.put<any>("https://localhost:44370/api/Customer/UpdateCustomerDetails",payload);
  }
  
}
