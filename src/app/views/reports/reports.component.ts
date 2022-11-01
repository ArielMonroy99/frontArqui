import { Component, OnInit } from '@angular/core';
import { multi } from 'src/app/models/multi';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ReportsService } from 'src/app/services/reports.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  
  ngOnInit(): void {
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): {role:['GUEST']}
    if(user.role[0] !== "ADMIN")
      this.router.navigate(['home'])
      this.getData() 
  }
  year = '2022'
  typeChart = 'product'
  multi: any[];
  view: [number,number] = [1200, 500];
  reports: Map<string,any> 
  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Month';
  yAxisLabel: string = 'Sales';
  timeline: boolean = true;

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f00', '#0f0', '#0ff', '#ff0', '#f0f', '#00f'],
  };
  constructor(private reportServices: ReportsService, private router:Router) {
   
  }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  getProductsReport(){
    this.reportServices.productReports(parseInt(this.year)).subscribe(
      data=>{
        let report = new Map(Object.entries(data))
        //this.multi = Array.of(report)
        this.multi = Array.from(report.values())
        console.log(this.multi);
      }
    )
  } 
  getVeterinaryReport(){
    this.reportServices.veterinaryReports(parseInt(this.year)).subscribe(
      data=>{
        let report = new Map(Object.entries(data))
        //this.multi = Array.of(report)
        this.multi = Array.from(report.values())
        console.log(this.multi);
      }
    )
  }
  getData(){
    console.log(this.typeChart);
    
    if(this.typeChart==='product'){
      this.xAxisLabel = 'Month'
      this.yAxisLabel = 'Sales'
      this.getProductsReport()
    }
    if(this.typeChart==='veterinary'){
      this.xAxisLabel = 'Month'
      this.yAxisLabel = 'Appointments'
      this.getVeterinaryReport()
    }
  }
  setChart(){
    console.log(this.typeChart);
  }
  logChart(){
    console.log(this.typeChart);
    
  }
}
