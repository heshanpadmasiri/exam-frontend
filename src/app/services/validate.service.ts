import {Injectable} from '@angular/core';
import { UserServicesService } from './user-services.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ValidateService {

  constructor(private userService: UserServicesService) {
  }

  validateRegister(user) {
    if (user.name === undefined || user.email === undefined || user.username === undefined || user.password === undefined) {
      return false;
    }
    return true;
  }

  validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // use this to validate the pattern of userID
  validateUserId(userId: string){
    const re = /\d{6}[A-Z]/;
    return re.test(userId);
  }

  // use this to validate the pattern of a module Code
  validateModuleCode(moduleCode: string){
    const re = /[A-Z][A-Z] \d{4}/;
    return re.test(moduleCode);
  }

}
