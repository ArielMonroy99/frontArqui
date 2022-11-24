import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  error: any = {};
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);

      this.error = params;
    });
  }
}
