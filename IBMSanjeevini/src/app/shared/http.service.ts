import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  sendEmail(url, data) {
    console.log(url);
    console.log(data[0]);
    return this.http.post(url, data[0]);
  }
}
