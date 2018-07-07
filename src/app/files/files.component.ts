import { Component, OnInit } from '@angular/core';
import {ModuleService} from '../services/module.service';
import {UserServicesService} from '../services/user-services.service';
import {AuthService} from '../services/auth.service';
import {AngularFireStorage} from 'angularfire2/storage';

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
    private firebaseStorage: AngularFireStorage
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
      // todo: get the list of all available modules
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
