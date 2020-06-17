import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html'
})
export class DailyComponent implements OnInit {
  loading = false;
  data = [];
  total = 0;
  pagesizeAry = [16, 32, 48];
  theads = [
    { name: '任务名称', value: 'name' }
  ]
  constructor() { }

  ngOnInit() {
  }

}
