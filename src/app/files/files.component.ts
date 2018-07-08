import { Component, OnInit } from '@angular/core';
import {ModuleService} from '../services/module.service';
import {UserServicesService} from '../services/user-services.service';
import {AuthService} from '../services/auth.service';
import {AngularFireStorage} from 'angularfire2/storage';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  modules = [];
  fileList: FileData[];
  module: string;

  constructor(
    private moduleServices: ModuleService,
    private userService: UserServicesService,
    private authService: AuthService,
    private firebaseStorage: AngularFireStorage,
    private flashMessageService: FlashMessagesService
  ) {
    this.fileList = [];
  }

  ngOnInit() {
    if (this.authService.isAcademic()) {
      this.userService.getAdminModules().subscribe(res => {
        if (res.success) {
          this.modules = res.msg;
          this.module = this.modules[0];
          this.moduleServices.getFileList(this.module).subscribe(next => {
            if (next.success) {
              this.updateFileList(next.msg);
            }
          });
        }
      });
    } else {
      this.moduleServices.getModuleList().subscribe(res => {
        if (res.success) {
          this.modules = res.msg;
          this.module = this.modules[0];
          this.moduleServices.getFileList(this.module).subscribe(next => {
            if (next.success) {
              this.updateFileList(next.msg);
            }
          });
        }
      });
    }
  }

  onChange(module: string) {
    this.module = module;
    this.moduleServices.getFileList(this.module).subscribe(next => {
      if (next.success) {
       this.updateFileList(next.msg);
      }
    });
  }

  deleteFile(fileName: string) {
    if (confirm(`Are you sure that you want to delete ${fileName}`)) {
      this.firebaseStorage.ref(fileName).delete().subscribe(next => {

      }, error1 => {

      }, () => {
        this.moduleServices.deleteFile(this.module, fileName).subscribe(res => {
          if (res.success) {
            this.flashMessageService.show(res.msg, {
              cssClass: 'alert-success',
              timeOut: 5000
            });
          } else {
            console.log(res);
            this.flashMessageService.show(res.msg, {
              cssClass: 'alert-danger',
              timeOut: 5000
            });
          }
        });
      });

    }
  }

  updateFileList(nameList: any[]) {
    nameList.forEach(fileName => {
      console.log(fileName);
      const ref = this.firebaseStorage.ref(fileName);
      ref.getDownloadURL().subscribe(res => {
        this.fileList.push({
          name: fileName,
          url: res
        });
      });
    });
  }
}

interface FileData {
  name: string;
  url: string;
}
