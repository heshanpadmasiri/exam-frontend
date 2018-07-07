import { Component, OnInit } from '@angular/core';
import {UserServicesService} from '../services/user-services.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AngularFireStorage} from 'angularfire2/storage';
import {ModuleService} from '../services/module.service';
import {map} from 'rxjs/operators';
import {observable} from 'rxjs/symbol/observable';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  adminModules: any[];
  module: string;
  block = false;
  btnText: string;
  uploadProgress: number;

  constructor(
    private userService: UserServicesService,
    private flashMessageService: FlashMessagesService,
    private fireBaseFileStorage: AngularFireStorage,
    private moduleServices: ModuleService
  ) {
    this.blockUpload();
  }

  ngOnInit() {
    this.userService.getAdminModules().subscribe(res => {
      if (res.success) {
        this.adminModules = res.msg;
        this.module = this.adminModules[0];
        this.unBlockUpload();
      } else {
        this.flashMessageService.show('Internal Error', {
          cssClass: 'alert-danger',
          timeOut: 5000
        });
      }
    });
  }

  blockUpload() {
    this.block = true;
    this.btnText = 'Wait';
  }

  unBlockUpload() {
    this.block = false;
    this.btnText = 'Upload';
  }

  onChange(module: string) {
    this.module = module;
    console.log(module);
  }

  upload(event: any) {
    this.blockUpload();
    const fileName = event.target.files[0].name;
    const fileRef = this.fireBaseFileStorage.ref(fileName);
    fileRef.put(event.target.files[0]).then(success => {

      this.moduleServices.recordUpload(this.module, fileName).subscribe(res => {
        if (res.success) {
          this.flashMessageService.show('Upload Complete', {
            cssClass: 'alert-success',
            timeOut: 5000
          });
        } else {

          this.flashMessageService.show('Upload failed', {
            cssClass: 'alert-danger',
            timeOut: 5000
          });
        }
        this.unBlockUpload();
      });
    }, err => {
      console.log(err);
      this.unBlockUpload();
      this.flashMessageService.show(err.message, {
        cssClass: 'alert-danger',
        timeOut: 5000
      });
    });
  }






}
