import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {


  public chart: any;
  public dataSource = {
    datasets: [
        {
          data: <any>[],
          backgroundColor: [
              '#ffcd56',
              '#ff6384',
              '#36a2eb',
              '#fd6b19',
              '#67bf7d',
              '#e0891d',
              '#e01dd3',
              '#6b5f6b'
          ]
        }
    ],
    labels: <any>[]
  }
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
      this.http.get("http://localhost:3000/budget")
      .subscribe((res: any) => {
        for(var i=0; i < res.mybudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.mybudget[i].budget;
          this.dataSource.labels[i] = res.mybudget[i].title
        }
        this.createChart();
      })
  }

  createChart() {
   this.chart = new Chart("myChart", {
    type: 'pie',
    data: this.dataSource
   })
  }
}
