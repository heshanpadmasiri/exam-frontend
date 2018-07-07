import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private flashMessageServices: FlashMessagesService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  onLogoutClick() {
    this.auth.logout();
    this.flashMessageServices.show('You are logged out', {
      cssClass: 'alert-success',
      timeOut: 3000
    });
    this.router.navigate(['/login']);
    return false;
  }

}
