import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ServerService, MessageService } from '@core';
import { AddMoneyComponent } from '../add-money/add-money.component';
import { isNumber } from 'util';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html'
})
export class MoneyComponent implements OnInit {
  searchItems = [
    { name: '类型', value: 'activity_type', type: 'text', class: 'option1', span: 6 },
    { name: '状态', value: 'show', type: 'text', class: 'option2', span: 6 }
  ];
  searchData = {
    activity_type: null,
    show: null
  };
  loading = false;
  data = [];
  total = 0;
  pagesizeAry = [16, 32, 48];
  theads = [
    { name: '活动类型', value: 'activity_type' },
    { name: '活动时长（天）', value: 'hours' },
    { name: '应付价格（元）', value: 'handler_price' },
    { name: '实付价格（元）', value: 'real_price' },
    { name: '状态', value: 'show' }
  ];
  showOption = [
    { name: '隐藏', value: 0 },
    { name: '显示', value: 1 }
  ];
  showObj = {
    0: '隐藏',
    1: '显示'
  };
  typeOption = [];
  typeObj = {};

  constructor(
    private nzMessageService: NzMessageService,
    private serverService: ServerService,
    private message: MessageService,
    private modalService: NzModalService
  ) {
    this.serverService.activity__type_list().subscribe(res => {
      this.typeOption = [...res];
      this.typeOption.forEach(item => {
        this.typeObj[item.value] = item.name;
      })
    });
  }

  ngOnInit() {
    this.get_data();
  }

  get_data() {
    let params = {};
    if (this.searchData.activity_type) params['activity_type'] = this.searchData.activity_type;
    if (isNumber(this.searchData.show)) params['show'] = this.searchData.show;
    this.loading = true;
    this.serverService.activity__time_list(params).subscribe(res => {
      this.loading = false;
      this.data = res['result'];
      this.total = this.data.length;
      this.data.forEach(item => {
        item['hours'] = Number((item['hours'] / 24).toFixed(0));
        item['handler_price'] = Number((item.handler_price / 100).toFixed(2));
        item['real_price'] = Number((item.real_price / 100).toFixed(2));
      })
    })
  }

  show_modal(data?) {
    const modal = this.modalService.create({
      nzTitle: data ? '编辑活动时长' : '添加活动时长',
      nzContent: AddMoneyComponent,
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

  clear_data() {
    this.searchData = {
      activity_type: null,
      show: null
    };
    this.get_data();
  }

  change_show(id, show) {
    this.serverService.activity__change_time_show({ id, show }).subscribe(res => {
      if (res.status === 200) {
        this.nzMessageService.success('活动时长状态修改成功！');
        this.get_data();
      }
    })
  }

  delete_time(id) {
    this.serverService.activity__del_times({ id }).subscribe(res => {
      if (res.status === 200) {
        this.nzMessageService.success('活动时长删除成功！');
        this.get_data();
      }
    })
  }
}
