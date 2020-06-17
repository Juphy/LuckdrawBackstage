import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerService, MessageService } from '@core';
import { NzMessageService } from 'ng-zorro-antd';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  searchItems = [
    { name: '用户昵称', value: 'nickname', type: 'text', class: 'input', span: 6 },
    { name: '用户电话', value: 'phone', type: 'text', class: 'input', span: 6 },
    { name: '用户ID', value: 'belong_to', type: 'text', class: 'number', span: 6 }
  ];
  loading = false;
  searchData = {
    page: 1,
    pagesize: 16,
    nickname: '',
    phone: '',
    belong_to: null
  };
  data = [];
  total = 0;
  pagesizeAry = [16, 32, 48];
  theads = [
    { name: '活动名称', value: 'name' },
    { name: '活动奖品', value: 'image' },
    { name: '开奖类型', value: 'draw_mode' },
    { name: '最终开奖时间', value: 'end_time' },
    { name: '创建时间', value: 'created_at' },
    { name: '创建人ID', value: 'creator_id' },
    { name: '创建人', value: 'creator' },
    { name: '创建人电话', value: 'phone' },
  ];
  DrawMode = {
    1: '定时开奖',
    2: '手动开奖',
    3: '满人开奖' // constraint_max_num
  };
  prizeIndex = {
    0: '一等奖',
    1: '二等奖',
    2: '三等奖',
    3: '四等奖',
    4: '五等奖'
  };
  constructor(
    private nzMessageService: NzMessageService,
    private serverService: ServerService,
    private message: MessageService
  ) { }

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
      let value = item.value;
      if (this.searchData[value]) params[value] = this.searchData[value];
    })
    this.loading = true;
    this.serverService.activity__manager_list(params).subscribe(res => {
      this.loading = false;
      if (res.status === 200) {
        res = res['result'];
        this.data = res['data'];
        this.total = res['pageinfo']['total'];
        this.data.forEach(item => {
          item['created_at'] = formatDate(item.created_at, 'yyyy-MM-dd HH:mm:ss', 'en-US');
          let draw_mode = item.draw_mode;
          switch (draw_mode) {
            case 1:
              item.draw_mode = '定时开奖'
              break;
            case 2:
              item.draw_mode = '手动开奖'
              break;
            case 3:
              item.draw_mode = `满人开奖（${item.constraint_max_num}人）`
              break;
          }
        })
      }
    }, err => {
      this.loading = false;
    })
  }

  clear_data() {
    this.searchData = {
      page: 1,
      pagesize: this.searchData.pagesize,
      nickname: '',
      phone: '',
      belong_to: null
    };
    this.get_data();
  }
}
