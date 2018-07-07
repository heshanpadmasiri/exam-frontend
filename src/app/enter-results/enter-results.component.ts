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

  constructor(private userService: UserServicesService,
              private moduleService: ModuleService,
              private flashMessageService: FlashMessagesService,
              private validationService: ValidateService) {
  }

  ngOnInit() {
    this.userService.getAdminModules().subscribe(message => {
      if (message.success) {
        this.adminModules = message.msg;
        if (this.adminModules.length > 0) {
          this.currentModule = this.adminModules[0];
          this.moduleData = this.moduleService.getModuleData(this.adminModules[0]).subscribe(next => {
            if (next.success) {
              this.moduleData = next.msg;
              this.updateCurrentResult();
            }
          });
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
    console.log(this.currentResult);
  }

  onSubmit() {
    this.pushResult();
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
    let lock = true;
    for (let index = 0; index < this.registeredStudents.length; index++) {
      const result = this.currentResult[index][this.registeredStudents[index]].toUpperCase();
      console.log(result);
      console.log(this.validationService.validateResults(result));
      if (this.validationService.validateResults(result)) {
        finalResult.push({
          [this.registeredStudents[index]]: result
        });
      } else {
        lock = false;
      }
    }
    if(lock){
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
      });
    } else {
      this.flashMessageService.show('Results invalid', {
        cssClass: 'alert-danger',
        timeOut: 5000
      });
    }

  }
}

