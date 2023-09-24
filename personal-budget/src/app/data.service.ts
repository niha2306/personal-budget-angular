import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private API_URL = 'http://localhost:3000/budget';
  private budgetData: any ;
  
  constructor(private http: HttpClient) { }

  fetchData() {
    if(!this.budgetData) {
     return this.http.get(this.API_URL)
    }
    return of(this.budgetData);
  }
}
