import {Component, OnInit} from '@angular/core';
import {UserServicesService} from '../../services/user-services.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  resultsReady = false;
  results = [];

  constructor(public userService: UserServicesService) {
  }

  ngOnInit() {
    this.userService.getOverallResults().subscribe(data => {
      if (data.success) {
        this.results = data.msg;
        this.resultsReady = true;
        console.log(this.results);
      }
    });
  }

}


