import {Component, OnInit} from '@angular/core';
import {UserServicesService} from '../../services/user-services.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-register-to-module',
  templateUrl: './register-to-module.component.html',
  styleUrls: ['./register-to-module.component.css']
})
export class RegisterToModuleComponent implements OnInit {

  moduleCode: string;

  constructor(private userService: UserServicesService,
              private flashMessageService: FlashMessagesService) {
  }

  ngOnInit() {
  }

  onRegistrationSubmit() {
    this.userService.registerToModule(this.moduleCode.toLocaleLowerCase()).subscribe(message => {
      if (message.success) {
        this.flashMessageService.show('Registered Successfully', {
          cssClass: 'alert-success',
          timeOut: 5000
        });
      } else {
        this.flashMessageService.show(message.msg, {
          cssClass: 'alert-danger',
          timeOut: 5000
        });
      }
    });
  }

}
