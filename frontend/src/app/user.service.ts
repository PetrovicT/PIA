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
    return this.http.post(`${this.uri}/users/login`, data);
  }

  findUser(username, password){
    const data={
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/users/findUser`, data);
  }

  changePassword(oldPassword, newPassword, username){
    const data={
      oldPassword: oldPassword,
      newPassword: newPassword,
      username: username
    }
    return this.http.post(`${this.uri}/users/changePassword`, data);
  }
}

