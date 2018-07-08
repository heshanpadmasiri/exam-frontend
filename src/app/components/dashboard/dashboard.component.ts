import {Component, OnInit} from '@angular/core';

import {UserServicesService} from '../../services/user-services.service';
import {ExamResultsService} from '../../services/exam-results.service';
import {AuthService} from '../../services/auth.service';
import * as Chartist from 'chartist';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  messages: Message[];
  moduleMessages: Message[];
  reCorrectionMessages: Message[];
  netGpaChange: number;
  netGpa: number;
  gpaMap: Map<string, number>;

  constructor(private userService: UserServicesService , public auth: AuthService, private examResultsService: ExamResultsService) {
    this.moduleMessages = [];
    this.reCorrectionMessages = [];
    this.gpaMap = new Map();
    this.gpaMap.set('A+', 4.2);
    this.gpaMap.set('A', 4);
    this.gpaMap.set('B+', 3.5);
    this.gpaMap.set('B', 3);
    this.gpaMap.set('C+', 2.5);
    this.gpaMap.set('D+', 2);
    this.gpaMap.set('D', 1.0);
    this.gpaMap.set('F', 0);
    this.netGpaChange = this.examResultsService.getNetGpaChange();
    this.netGpa = 0;
  }


  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function(data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
            seq++;
            data.element.animate({
              opacity: {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
    });

    seq = 0;
}
startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function(data) {
      if (data.type === 'bar') {
          seq2++;
          data.element.animate({
            opacity: {
              begin: seq2 * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: 'ease'
            }
          });
      }
    });

    seq2 = 0;
  }

  ngOnInit() {
    this.userService.getMessages().subscribe(next => {//call back function
      console.log(next);
      if (next.success) {
        this.messages = next.msg;
        this.addToMessageArrays(this.messages);
      }
    });
    this.userService.getOverallResults().subscribe(res => {
      if (res.success) {
        const modules = [];
        const gpas = [];
        for (const each of res.msg) {
          modules.push(each.module);
          gpas.push(this.gpaMap.get(each.result));
          this.netGpa += this.gpaMap.get(each.result);
        }
        const examResultsChart: any = {
          labels: modules,
          series: [
            gpas
          ]
        };
        if (this.auth.isStudent()) {
          const optionsExamResultsChart: any = {
            lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
            }),
            low: 0,
            high: 4.5,
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
          };
          const examResultChart = new Chartist.Line('#examResultsChart', examResultsChart, optionsExamResultsChart);

          this.startAnimationForLineChart(examResultChart);
        }
      }
    });




  }

  addToMessageArrays(messages: Message[]) {
    messages.forEach(message => {
      if (message.type === 'module message') {
        this.moduleMessages.push(message);
      } else if (message.type === 're-correction request') {
        this.reCorrectionMessages.push(message);
      }
    });
  }

}

interface Message {
  author: string;
  content: string;
  type: string;
}
