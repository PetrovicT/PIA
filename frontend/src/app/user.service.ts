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

  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  birthday: string; // saved as 2022-03-16 
  height: number;
  type: string;

  register(username, password, name, surname, email, birthday, height, type){
    const data={
      username: username,
      password: password,
      name: name,
      surname: surname,
      email: email,
      birthday: birthday,
      height: height,
      type: type
    }
    return this.http.post(`${this.uri}/users/register`, data);
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

  // upload pictures and store it in images folder - backend
  upload(data){
    return this.http.post(`${this.uri}/images`, data);

  }
}

