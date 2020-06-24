import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ServerService, MessageService } from '@core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html'
})
export class FeedbackComponent implements OnInit {
  searchItems = [];
  loading = false;
  searchData = {
    page: 1,
    pagesize: 16
  };
  data = [];
  total = 0;
  pagesizeAry = [16, 32, 48];
  theads = [
    { name: '反馈问题', value: 'name' },
    { name: '反馈时间', value: 'created_at' },
  ];
  visible = false;
  okLoading = false;
  remark = '';
  id: number;
  constructor(
    private nzMessageService: NzMessageService,
    private serverService: ServerService,
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
    this.loading = true;
    this.serverService.manager__feedback_list(params).subscribe(res => {
      this.loading = false;
      if (res.status === 200) {
        res = res['result'];
        this.data = res['data'];
        this.total = res['pageinfo']['total'];
        this.data.forEach(item => {
          item['name'] = JSON.parse(item.content)['ops'][0]['insert'];
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
      pagesize: this.searchData.pagesize,
    };
    this.get_data();
  }

  // 处理反馈问题
  show_modal(id) {
    this.id = id;
    this.visible = true;
  }

  handle_cancel() {
    this.visible = false;
    this.id = null;
  }

  handle_ok() {
    this.okLoading = true;
    this.serverService.manager__handle_feedback({
      id: this.id,
      remark: this.remark
    }).subscribe(res => {
      this.okLoading = false;
      this.visible = false;
      this.nzMessageService.success('反馈已处理！');
      this.get_data();
    }, err => {
      this.okLoading = false;
      this.visible = false;
    })
  }


}
