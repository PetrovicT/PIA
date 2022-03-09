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
  birthday: string;
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

  showLoginWindow(){
    this.ruter.navigate(['login']);
  }
  
  register(){
    this.messageUsername = '';
    this.userService.login(this.username, this.password).subscribe((user: User)=>{
      if(!user){
        this.messageUsername = 'Niste uneli ispravne podatke';
      }
      else{
        localStorage.setItem('user', JSON.stringify(user));
        if(user.type=="kupac"){
          this.ruter.navigate(['user']);
        }
        else{
          this.ruter.navigate(['user']);
        }
      }
    })
  }
}


