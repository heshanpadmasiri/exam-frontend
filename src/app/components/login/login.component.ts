import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;
  block = false;
  btnText: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) {
  }

  ngOnInit() {
    this.unBlockSubmit();
  }

  blockSubmit() {
    this.block = true;
    this.btnText = 'Please wait';
  }

  unBlockSubmit() {
    this.block = false;
    this.btnText = 'Login';
  }

  onLoginSubmit() {
    if (! this.block) {
      this.blockSubmit();
      const user = {
        username: this.username,
        password: this.password
      };

      this.auth.authenticateUser(user).subscribe(data => {
        if (data.success) {
          // Login successful store the token
          this.auth.storeUserData(data.token, data.user);
          this.flashMessagesService.show('Login successful', {
            cssClass: 'alert-success',
            timeOut: 5000
          });
          this.router.navigate(['dashboard']);

        } else {
          this.flashMessagesService.show(data.msg, {
            cssClass: 'alert-danger',
            timeOut: 5000
          });
          this.router.navigate(['login']);
        } this.unBlockSubmit();
      });
    }

  }

}
