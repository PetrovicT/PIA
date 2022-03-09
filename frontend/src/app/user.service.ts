import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4000';
  constructor(private http: HttpClient) { }

  login(username, password){
    const data={
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/login`, data);
  }
}

