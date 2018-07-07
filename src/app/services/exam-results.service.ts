import { Injectable } from '@angular/core';

@Injectable()
export class ExamResultsService {

  results:any;

  constructor() {
    this.results = [
      {
        module:"CS 2150",
        result:"A",
        gpa:3.7
      },
      {
        module:"CS 2151",
        result:"B",
        gpa:3.0
      },
      {
        module:"CS 2152",
        result:"A+",
        gpa:4.2
      }
    ]
   }

   getExamResults(){
     return this.results;
   }

   getExamResultsForChart(){
     let modules = new Array<String>();
     let gpas = new Array<number>();
     for (const each of this.results) {
       modules.push(each.module);
       gpas.push(each.gpa);
     }
     return {
       modules:modules,
       gpas:gpas
     }
   }

   getNetGpaChange(){
     return 0.2;
   }

   getNetGpa(){
     return 3.5;
   }

}
