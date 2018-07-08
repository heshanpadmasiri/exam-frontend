import { Injectable } from '@angular/core';
import {UserServicesService} from './user-services.service';

@Injectable()
export class ExamResultsService {

  results: any;
  gpaMap: Map<string, number>;

  constructor(private  userSevice: UserServicesService) {
    this.results = [
      {
        module: 'CS 2150',
        result: 'A',
        gpa: 3.7
      },
      {
        module: 'CS 2151',
        result: 'B',
        gpa: 3.0
      },
      {
        module: 'CS 2152',
        result: 'A+',
        gpa: 4.2
      }
    ];
    this.gpaMap = new Map();
    this.gpaMap.set('A+', 4.2);
    this.gpaMap.set('A', 4);
    this.gpaMap.set('B+', 3.5);
    this.gpaMap.set('B', 3);
    this.gpaMap.set('C+', 2.5);
    this.gpaMap.set('D+', 2);
    this.gpaMap.set('D', 1.0);
    this.gpaMap.set('F', 0);
   }

   getExamResults() {
     return this.results;
   }



   getNetGpaChange() {
     return 0.2;
   }

   getNetGpa() {
     return 3.5;
   }

}
