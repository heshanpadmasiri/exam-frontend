import {Component, OnInit} from '@angular/core';
import {UserServicesService} from '../services/user-services.service';
import {ModuleService} from '../services/module.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../services/validate.service';


@Component({
  selector: 'app-enter-results',
  templateUrl: './enter-results.component.html',
  styleUrls: ['./enter-results.component.css']
})
export class EnterResultsComponent implements OnInit {

  adminModules = [];
  moduleData: any;
  currentResult = [];
  registeredStudents = [];
  currentModule: string;
  block: boolean;
  btnText: string;

  constructor(private userService: UserServicesService,
              private moduleService: ModuleService,
              private flashMessageService: FlashMessagesService,
              private validationService: ValidateService) {
  }

  ngOnInit() {
    this.ubBlockSubmit();
    this.userService.getAdminModules().subscribe(message => {
      if (message.success) {
        this.adminModules = message.msg;
        if (this.adminModules.length > 0) {
          this.onChange(this.adminModules[0]);
        }
      }
    });
  }

  updateCurrentResult() {
    this.registeredStudents = [];
    this.currentResult = [];
    this.moduleData.registeredStudents.forEach(student => {
      this.registeredStudents.push(student);
    });
    if (this.moduleData.resultAvailable) {
      this.currentResult = this.moduleData.results;
    } else {
      this.moduleData.registeredStudents.forEach(student => {
        const result = {
          student: ''
        };
        this.currentResult.push(result);
      });
    }
  }

  onSubmit() {
    this.pushResult();
  }

  blockSubmit() {
    this.block = true;
    this.btnText = 'Please wait';
  }

  ubBlockSubmit(){
    this.block = false;
    this.btnText = 'Submit';
  }

  onChange(moduleId: string) {
    this.currentModule = moduleId;
    this.moduleService.getModuleData(moduleId).subscribe(message => {
      if (message.success) {
        console.log(message.msg);
        this.moduleData = message.msg;
        this.updateCurrentResult();
      }
    });
  }

  pushResult() {
    const finalResult = [];
    this.blockSubmit();
    for (let index = 0; index < this.registeredStudents.length; index++) {
      const result = this.currentResult[index][this.registeredStudents[index]].toUpperCase();
      if (this.validationService.validateResults(result)) {
        finalResult.push({
          [this.registeredStudents[index]]: result
        });
      } else {
        this.ubBlockSubmit();
        this.flashMessageService.show('Check Results', {
          cssClass: 'alert-danger',
          timeOut: 5000
        });
      }
    }
    if (this.block) {
      this.moduleService.updateResults(this.currentModule, finalResult).subscribe(next => {
        if (next.success) {
          this.flashMessageService.show('Result update successful', {
            cssClass: 'alert-success',
            timeOut: 5000
          });
        } else {
          this.flashMessageService.show(next.msg, {
            cssClass: 'alert-danger',
            timeOut: 5000
          });
        }
        this.ubBlockSubmit();
      });
    } else {
      this.flashMessageService.show('Results invalid', {
        cssClass: 'alert-danger',
        timeOut: 5000
      });
      this.ubBlockSubmit();
    }

  }
}

