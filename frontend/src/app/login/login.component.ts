import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private ruter: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  message: string;

  login(){
    this.message = '';
    this.userService.login(this.username, this.password).subscribe((user: User)=>{
      if(!user){
        this.message = 'Niste uneli ispravne podatke';
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
