import {Component, OnInit} from '@angular/core';
import {UserServicesService} from '../../services/user-services.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ModuleService} from '../../services/module.service';

@Component({
  selector: 'app-register-to-module',
  templateUrl: './register-to-module.component.html',
  styleUrls: ['./register-to-module.component.css']
})
export class RegisterToModuleComponent implements OnInit {

  moduleCode: string;
  block: boolean;
  btnText: string;
  potentialModules = [];

  constructor(private userService: UserServicesService,
              private flashMessageService: FlashMessagesService,
              private moduleService: ModuleService) {
  }

  ngOnInit() {
    this.blockSubmission();
    this.moduleService.getModuleList().subscribe(observable => {
      if (observable.success) {
        console.log(observable);
        const moduleList = observable.msg;
        console.log(observable.msg)
        console.log(moduleList);
        this.userService.getRegisteredModules().subscribe(next => {
          if (next.success) {
            const registeredModules = next.msg;


            console.log("registered mdouel")
            console.log(registeredModules)
            moduleList.forEach(module => {
              if(registeredModules.indexOf(module) === -1){
                this.potentialModules.push(module);
              }
            });
            this.onChange(this.potentialModules[0]);
            this.unBlockSubmission();
          }
        });
      }
    });
  }

  onChange(module:string){
    this.moduleCode = module;
  }

  blockSubmission() {
    this.block = true;
    this.btnText = 'Please Wait';
  }

  unBlockSubmission() {
    this.block = false;
    this.btnText = 'Register to module';
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
