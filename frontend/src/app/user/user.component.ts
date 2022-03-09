import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService, private ruter: Router) { }

  ngOnInit(): void {
    this.messageError = "";
    this.messageGood = "";
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  user: User;
  oldPassword: string;
  newPassword: string;
  messageError: string;
  messageGood: string;

  changePassword() {
    this.userService.changePassword(this.oldPassword, this.newPassword, this.user.username).subscribe((userX: User) => {
      if (!userX) {
        this.messageError = 'Pogrešno ste uneli staru lozinku - nije izvršena promena lozinke!';
        this.messageGood = "";
      }
      else {
        this.messageGood = 'Uspešno ste promenili lozinku!';
        this.messageError = "";
        // update user informations on the screen
        this.userService.findUser(this.user.username, this.newPassword).subscribe((user: User) => {
          if (!user) {
            console.log("Nije pronadjen user u findUser nakon update lozinke");
          }
          else {
            this.user = user;
            localStorage.setItem("user", JSON.stringify(user));
          }
        })
 
        this.ruter.navigate(['user']);
        location.reload();
      }
    })

  }
}