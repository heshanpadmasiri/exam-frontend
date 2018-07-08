import {Component, OnInit} from '@angular/core';
import {UserServicesService} from '../../services/user-services.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-re-correction',
  templateUrl: './re-correction.component.html',
  styleUrls: ['./re-correction.component.css']
})
export class ReCorrectionComponent implements OnInit {

  registeredModules: any[];
  selectedModule: string;
  result: string;
  reason: string;
  block: boolean;
  btnText: string;

  constructor(private userService: UserServicesService,  // to do the dependency injection when component is constructed further use
              private flashMessageService: FlashMessagesService) {
    this.registeredModules = [];
  }

  ngOnInit() {                                           // is component life cyclehook  It's a good place to put initialization logic.
    this.unBlockSubmission();
    this.userService.getRegisteredModules().subscribe(message => {
      // observal pattern
      if (message.success) {
        this.registeredModules = message.msg;
        this.selectedModule = this.registeredModules[0];
        console.log(this.registeredModules);
      }
    });
  }

  blockSubmission() {
    this.block = true;
    this.btnText = 'Please wait';
  }

  unBlockSubmission() {
    this.block = false;
    this.btnText = 'Submit';
  }

  onSubmit() {
    this.blockSubmission();
    this.userService.requestReCorrection(this.selectedModule).subscribe(message => {
      if (message.success) {
        this.flashMessageService.show('Re-correction request placed successfully', {
          cssClass: 'alert-success',
          timeOut: 5000
        });
      } else {
        this.flashMessageService.show(message.msg, {
          cssClass: 'alert-danger',
          timeOut: 5000
        });
      }
      this.unBlockSubmission();
    });
  }

  onChange(value) {
    this.selectedModule = value;
  }

}
