import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ServerService, MessageService, Options } from '@core';
import { AddDailyComponent } from '../add-daily/add-daily.component';

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
    { name: '任务名称', value: 'name' },
    { name: '任务次数', value: 'times' },
    { name: '奖励积分', value: 'point' },
    { name: '奖励金额（元）', value: 'balance' },
    { name: '任务类型', value: 'action_type' },
    { name: '任务跳转路径', value: 'url' },
  ];
  typeObj = {};
  constructor(
    private nzMessageService: NzMessageService,
    private serverService: ServerService,
    private message: MessageService,
    private modalService: NzModalService
  ) {
    this.typeObj = Options.Action;
  }

  ngOnInit() {
    this.get_data();
  }

  get_data() {
    this.loading = true;
    this.serverService.manager__daily_task_list().subscribe(res => {
      this.loading = false;
      this.data = res['result'];
      this.data.forEach(item => {
        item.balance = Number((item.balance / 100).toFixed(2));
        item.action_type = item.action_type;
      })
      this.total = this.data.length;
    }, err => {
      this.loading = false;
    })
  }

  del_task(id) {
    this.serverService.manager__del_daily_task({ id }).subscribe(res => {
      if (res.status === 200) {
        this.nzMessageService.success('删除成功！');
        this.get_data();
      }
    })
  }

  show_modal(data?) {
    const modal = this.modalService.create({
      nzTitle: data ? '每日任务详情' : '添加每日任务',
      nzContent: AddDailyComponent,
      nzFooter: null,
      nzComponentParams: {
        data
      },
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: 960
    })
    modal.afterClose.subscribe(res => {
      if (res) this.get_data();
    })
  }

}
