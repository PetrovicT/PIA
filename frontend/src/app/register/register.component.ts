import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private ruter: Router) {
    this.token = undefined;
  }

  // --------------------------------------- data --------------------------------------
  // pictures upload 
  chosenPictures: Array<File>;
  // captcha
  token: string | undefined;
  // user details
  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  birthday: string; // saved as 2022-03-16 
  height: number;
  type: string;
  // error messages
  messageUsername: string;
  messagePassword: string;
  messageName: string;
  messageSurname: string;
  messageEmail: string;
  messageBirthday: string;
  messageHeight: string;
  messageType: string;
  messageUpload: string;
  messageUploadGood: string;

  // --------------------------------------- choosing pictures --------------------------------------
  // error with multiple pictures, first picture size is read as 0px, 0px...
  // works fine with one picture
  chooseFiles(event) {
    this.messageUpload = "";
    this.messageUploadGood= "";
    this.chosenPictures = [];
    var error = 0;
    for (let i = 0; i < event.target.files.length; i++) {
      var new_image = new Image();
      new_image.src = URL.createObjectURL(event.target.files[i]);
      new_image.onload = () => {
        if (new_image.width < 100 || new_image.width > 300) {
          this.messageUpload = "Širina slike nije prihvatljiva!";
          // abort uploading pictures
          //alert(new_image.width + " " + new_image.height + "error1");
          error = 1;
        }
        else {
          if (new_image.height < 100  || new_image.height > 300) {
            this.messageUpload = "Visina slike nije prihvatljiva!";
            //alert(new_image.width + " " + new_image.height + "error2");
            // abort uploading pictures
            error = 1;
          } else {
            // picture size is ok, check others, dont change error flag
            //alert(new_image.width + " " + new_image.height );
          }
        }
        // end of loading 
        if (i == event.target.files.length - 1) {
          if (error == 0) {
            this.chosenPictures = event.target.files;
          }
          else {
            delete (this.chosenPictures);
          }
        }
      }
    }
  }

  // --------------------------------------- uploading pictures on button --------------------------------------
  // !!!--------------- change to uploading pictures on pressing the register button, not send button ------!!!!
  // pictures upload functionality
  upload() {
    this.messageUploadGood = "";
    if (this.chosenPictures.length == 0) 
      this.messageUpload = "Zbog neodgovarajuće dimenzije slike nisu dodate!";
    else this.messageUploadGood = "Uspešno ste dodali slike!";
    var formData = new FormData();
    for (let photo of this.chosenPictures) {
      let file_img = new File([photo], photo.name);
      formData.append('files', file_img);
    }
    this.userService.upload(formData).subscribe();
  }


  // user type select - option
  ngOnInit(): void {
    this.type = "";
  }


   // ------------------------------------------------- captcha ---------------------------------------------------
  public send(form: NgForm): void {
    if (form.invalid) {
      // if not checked unable registration!
      alert("Nisi čekirao captcha!");
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }
    else {alert("Uspešno si čekirao captcha!")}
    console.debug(`Token [${this.token}] generated`);
  }


  showLoginWindow() {
    this.ruter.navigate(['login']);
  }

  // ----------------------------------------------- registration ------------------------------------------------
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


