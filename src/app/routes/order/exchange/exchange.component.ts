import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ServerService, MessageService } from '@core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html'
})
export class ExchangeComponent implements OnInit {
  searchItems = [
    { name: '用户昵称', value: 'nickname', type: 'text', class: "input", span: 6 },
    { name: '时间', value: 'date', type: 'text', class: "date", span: 8 },
  ];
  loading = false;
  searchData = {
    nickname: '',
    date: null
  };
  data = [];
  total = 0;
  pagesizeAry = [16, 32, 48];
  theads = [
    { name: '用户昵称', value: 'nickname' },
  ];
  constructor(
    private nzMessageService: NzMessageService,
    private serverService: ServerService,
  ) { }

  ngOnInit() {
    this.get_data();
  }

  get_data() {
    let params = {};
    this.searchItems.forEach(item => {
      let value = item.value, param = this.searchData[value];
      switch (value) {
        case 'date':
          if (param && param[0]) params['start_time'] = formatDate(param[0], 'yyyy-MM-dd HH:mm:ss', 'en-US');
          if (param && param[1]) params['end_time'] = formatDate(param[1], 'yyyy-MM-dd HH:mm:ss', 'en-US')
          break;
        default:
          if (params) params[value] = param;
          break;
      }
    })
    this.loading = true;
    this.serverService.order__activity_times(params).subscribe(res => {
      this.loading = false;
      if (res.status === 200) {
        this.data = res['result'];
        this.total = this.data.length;
      }
    }, err => {
      this.loading = false;
    })
  }

  clear_data() {
    this.searchData = {
      nickname: '',
      date: null
    };
    this.get_data();
  }

}
