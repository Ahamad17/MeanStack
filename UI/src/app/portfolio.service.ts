import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) {
  }

  getDetails() {
    return this.http.get('http://localhost:3000/', this.httpOptions);
  }

  addMessage(message: any) {
    return this.http.post('http://localhost:3000/message', message, this.httpOptions);
  }
}
