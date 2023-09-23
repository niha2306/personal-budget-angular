import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';
import { BudgetdataService } from '../budgetdata.service';
@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {


  public chart: any;
  public dataD3 = <any>[];

  // d3Js Varibales
  public svg: any;
  private margin = 50;
  private width = 950;
  private height = 500;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;

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
  constructor(
    private http: HttpClient,
    private budgetDataService: BudgetdataService
  ) {

  }

  ngOnInit(): void {
    this.budgetDataService.fetchData()
      .subscribe((data) => {
        console.log(data);
        for(var i=0; i< data.mybudget.length; i++) {
          this.dataSource.datasets[0].data[i] = data.mybudget[i].budget;
          this.dataSource.labels[i] = data.mybudget[i].title;
          this.dataD3 = data.mybudget;
        }
        this.createChart();
        this.createD3Chart();
      })
  }

  createChart() {
   this.chart = new Chart("myChart", {
    type: 'pie',
    data: this.dataSource
   })
  }

  createD3Chart() {
    this.svg = d3.select("article#d3Chart")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );

    this.colors = d3.scaleOrdinal()
    .domain(this.dataD3.map((d: any) => d.title.toString()))
    .range([
      '#ffcd56',
      '#ff6384',
      '#36a2eb',
      '#fd6b19',
      '#67bf7d',
      '#e0891d',
      '#e01dd3',
      '#6b5f6b'
    ]);

    const pie = d3.pie<any>().value((d: any) => Number(d.budget));

    this.svg
    .selectAll('pieces')
    .data(pie(this.dataD3))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d: any, i: any) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");

    const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);

    
    this.svg
      .selectAll('pieces')
      .data(pie(this.dataD3))
      .enter()
      .append('text')
      .text((d: any, i: any) => (this.dataD3[i].title+ "- $"+ this.dataD3[i].budget))
      .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 15);
  }

}
