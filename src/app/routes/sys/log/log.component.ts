import { Component, OnInit } from '@angular/core';
import { Options } from '@core';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { isTemplateRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html'
})
export class LogComponent implements OnInit {
  searchItems = [
    { name: '动作类型', value: 'type', type: 'text', class: "option", span: 6 },
    { name: '用户ID', value: 'user_id', type: 'text', class: "input", span: 6 },
    { name: '创建时间', value: 'date', type: 'text', class: "date", span: 8 }
  ];
  loading = false;
  searchData = {
    page: 1,
    pagesize: 16,
    type: null,
    user_id: '',
    date: null
  };
  data = [];
  total = 0;
  pagesizeAry = [16, 32, 48];
  theads = [
    { name: '动作类型', value: 'type' },
    { name: '用户ID', value: 'user_id' },
    { name: '动作', value: 'action' },
    { name: '积分', value: 'point' },
    { name: '金额（元）', value: 'balance' },
    { name: '创建时间', value: 'created_at' }
  ];
  actionType = [...Options.action];
  ActionType = { ...Options.Action };
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.get_data();
  }

  get_data(flag?: boolean) {
    if (flag) this.searchData.page = 1;
    let params: any = {
      page: this.searchData.page,
      pagesize: this.searchData.pagesize
    };
    for (let key of ['type', 'user_id']) {
      if (this.searchData[key]) params[key] = this.searchData[key];
    }
    if (params.user_id) params.user_id = Number(params.user_id);
    if (this.searchData.date) {
      let create = this.searchData.date;
      if (create[0]) params['start_time'] = formatDate(create[0], 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
      if (create[1]) params['end_time'] = formatDate(create[1], 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
    }
    this.loading = true;
    this.http.post('manager/action_logs', params).subscribe(res => {
      this.loading = false;
      if (res['status'] === 200) {
        res = res['result'];
        this.data = res['data'];
        this.total = res['pageinfo']['total'];
        this.data.forEach(item => {
          item['type'] = this.ActionType[item.type];
          item['point'] = item.point ? (item.before_point + '+' + item.point) : item.point;
          item['balance'] = item.balance ? ((item.before_balance / 100).toFixed(2) + ' + ' + (item.balance / 100).toFixed(2)) : item.balance;
          item['created_at'] = formatDate(item.created_at, 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
        })
      }
    }, err => {
      this.loading = false;
    })
  }

  clear_data() {
    this.searchData = {
      page: 1,
      pagesize: 16,
      type: null,
      user_id: '',
      date: null
    }
    this.get_data();
  }

}
