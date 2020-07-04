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
    { name: '购买时间', value: 'date', type: 'text', class: "date", span: 8 },
  ];
  loading = false;
  searchData = {
    nickname: '',
    date: null,
    page: 1,
    pagesize: 16
  };
  data = [];
  total = 0;
  pagesizeAry = [16, 32, 48];
  theads = [
    { name: '用户昵称', value: 'nickname' },
    { name: '活动类型', value: 'activity_type' },
    { name: '时长（天）', value: 'hours' },
    { name: '购买时间', value: 'updated_at' },
    { name: '充值金额（元）', value: 'balance' }
  ];
  typObj = {};
  constructor(
    private nzMessageService: NzMessageService,
    private serverService: ServerService,
  ) {
    this.serverService.activity__type_list().subscribe(res => {
      res.forEach(item => {
        this.typObj[item.value] = item.name
      })
    })
  }

  ngOnInit() {
    this.get_data();
  }

  get_data(flag?: boolean) {
    if (flag) this.searchData.page = 1;
    let params = {
      page: this.searchData.page,
      pagesize: this.searchData.pagesize
    };
    this.searchItems.forEach(item => {
      let value = item.value, param = this.searchData[value];
      switch (value) {
        case 'date':
          if (param && param[0]) params['start_time'] = formatDate(param[0], 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
          if (param && param[1]) params['end_time'] = formatDate(param[1], 'yyyy-MM-dd HH:mm:ss', 'zh-Hans')
          break;
        default:
          if (param) params[value] = param;
          break;
      }
    })
    this.loading = true;
    this.serverService.order__activity_times(params).subscribe(res => {
      this.loading = false;
      if (res.status === 200) {
        res = res.result;
        this.data = res.data;
        this.total = res['pageinfo']['total'];
        this.data.forEach(item => {
          let extra_args = item.extra_args;
          let { activity_type, hours } = extra_args;
          item['activity_type'] = this.typObj[activity_type];
          item['hours'] = Number((hours / 24).toFixed(0));
          item['updated_at'] = formatDate(item.updated_at, 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
          item['balance'] = item.balance ? Number((item.balance / 100).toFixed(2)) : 0;
        })
      }
    }, err => {
      this.loading = false;
    })
  }

  clear_data() {
    this.searchData = {
      nickname: '',
      date: null,
      page: 1,
      pagesize: this.searchData.pagesize
    };
    this.get_data();
  }

}
