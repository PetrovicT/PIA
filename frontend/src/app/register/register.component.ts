import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private ruter: Router) { }

  ngOnInit(): void {
    this.type = "";
  }

  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  birthday: string; // saved as 2022-03-16 
  height: number;
  type: string;


  messageUsername: string;
  messagePassword: string;
  messageName: string;
  messageSurname: string;
  messageEmail: string;
  messageBirthday: string;
  messageHeight: string;
  messageType: string;

  showLoginWindow() {
    this.ruter.navigate(['login']);
  }

  register() {
    this.messageUsername = '';
    this.messagePassword = '';
    this.messageName = '';
    this.messageSurname = '';
    this.messageEmail = '';
    this.messageBirthday = '';
    this.messageHeight = '';
    this.messageType = '';

    // regex - check for errors
    if (this.messageUsername == '') {
      this.messageUsername = "Morate uneti korisničko ime!";
    }

    this.userService.register(this.username, this.password, this.name, this.surname, this.email, this.birthday, this.height, this.type).subscribe((resp) => {
      if (resp['message'] == 'user added') {
        // account made, then log in
        this.userService.login(this.username, this.password).subscribe((user: User) => {
          if (!user) {
            this.messageType = 'Niste uneli ispravne podatke';
          }
          else {
            localStorage.setItem('user', JSON.stringify(user));
            if (user.type == "kupac") {
              this.ruter.navigate(['user']);
            }
            else {
              this.ruter.navigate(['user']);
            }
          }
        })
      }
      else {
        this.messageType = 'Niste uneli ispravne podatke';
      }
    })
  }
}


