import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ServerService, MessageService } from '@core';
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
    { name: '任务名称', value: 'name' }
  ];
  constructor(
    private nzMessageService: NzMessageService,
    private serverService: ServerService,
    private message: MessageService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.get_data();
  }

  get_data() {
    this.serverService.manager__daily_task_list().subscribe(res => {

    })
  }

  show_modal(id?) {
    const modal = this.modalService.create({
      nzTitle: 'id' ? '每日任务详情' : '添加每日任务',
      nzContent: AddDailyComponent,
      nzFooter: null,
      nzComponentParams: {
        id
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
