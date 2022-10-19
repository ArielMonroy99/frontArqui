import { Component, OnInit } from '@angular/core';
import { multi } from 'src/app/models/multi';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ReportsService } from 'src/app/services/reports.service';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  
  ngOnInit(): void {
      this.getData() 
  }
  multi: any[];
  view: [number,number] = [700, 300];
  reports: Map<string,any> 
  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f00', '#0f0', '#0ff'],
  };
  constructor(private reportServices: ReportsService) {
   
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
  getData(){
    this.reportServices.productReports().subscribe(
      data=>{
        let report = new Map(Object.entries(data))
        //this.multi = Array.of(report)
        this.multi = Array.from(report.values())
        
       
      }
    )
  } 
}
