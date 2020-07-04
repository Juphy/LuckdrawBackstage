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
    { name: '活动名称', value: 'name', type: 'text', class: 'input', span: 6 },
    { name: '开奖类型', value: 'draw_mode', type: 'text', class: 'option', span: 6 },
    { name: '创建人昵称', value: 'nickname', type: 'text', class: 'input', span: 6 },
    { name: '创建人ID', value: 'belong_to', type: 'text', class: 'number', span: 6 }
  ];
  loading = false;
  searchData = {
    page: 1,
    pagesize: 16,
    nickname: '',
    belong_to: null,
    name: '',
    draw_mode: null,
  };
  data = [];
  total = 0;
  pagesizeAry = [16, 32, 48];
  theads = [
    { name: '活动名称', value: 'name' },
    { name: '活动奖品', value: 'image' },
    { name: '开奖类型', value: 'draw_mode' },
    { name: '参与条件', value: 'join' },
    { name: '最终开奖时间', value: 'end_time' },
    { name: '创建时间', value: 'created_at' },
    { name: '创建人ID', value: 'creator_id' },
    { name: '创建人昵称', value: 'creator' }
  ];
  DrawMode = {
    1: '定时开奖',
    2: '手动开奖',
    3: '满人开奖' // constraint_max_num
  };
  drawModeOption = [
    { name: '定时开奖', value: 1 },
    { name: '手动开奖', value: 2 },
    { name: '满人开奖', value: 3 }
  ];
  prizeIndex = {
    0: '一等奖',
    1: '二等奖',
    2: '三等奖',
    3: '四等奖',
    4: '五等奖'
  };
  constraintSex = {
    0: '无限制',
    1: '男性',
    2: '女性'
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
          item['created_at'] = formatDate(item.created_at, 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
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
      pagesize: 16,
      nickname: '',
      belong_to: null,
      name: '',
      draw_mode: null,
    };
    this.get_data();
  }
}
