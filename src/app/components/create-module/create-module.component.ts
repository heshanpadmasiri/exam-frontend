import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../../services/module.service';
import { UserServicesService } from '../../services/user-services.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-create-module',
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.css']
})
export class CreateModuleComponent implements OnInit {

  moduleId: string;
  admin: string;
  academicUsers: any[];
  block: boolean;
  btnText: string;

  constructor(
    private moduleService: ModuleService,
    private userService: UserServicesService,
    private flashMessageService: FlashMessagesService,
    private validationService: ValidateService,
  ) {
    this.block = false;
    this.btnText = 'Submit';
  }

  ngOnInit() {
    this.userService.getAcademicUsers().subscribe(res => {
      this.academicUsers = res.msg;
      this.admin = this.academicUsers[0];
    });
  }

  onFormSubmit() {
    if (!this.block) {
      this.block = true;
      this.btnText = 'Please Wait';
      this.moduleId = this.moduleId.toUpperCase();
      if (this.validationService.validateModuleCode(this.moduleId)) {
        this.moduleService.createModule(this.moduleId, this.admin).subscribe(res => {
          if (res.success) {
            this.flashMessageService.show('Module Create Successfully', {
              cssClass: 'alert-success',
              timeOut: 5000
            });
          } else {
            this.flashMessageService.show(res.msg, {
              cssClass: 'alert-danger',
              timeOut: 5000
            });
          }
          this.block = false;
          this.btnText = 'Submit';
        });
      } else {
        this.flashMessageService.show('Check module Id', {
          cssClass: 'alert-danger',
          timeOut: 5000
        });
        this.block = false;
        this.btnText = 'Submit';
      }

    }

  }

  onChange(selected: string) {
    this.admin = selected;
    console.log(this.admin);
  }

}
