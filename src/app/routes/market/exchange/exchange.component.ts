import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ServerService, MessageService } from '@core';
import { AddExchangeComponent } from '../add-exchange/add-exchange.component';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html'
})
export class ExchangeComponent implements OnInit {
  loading = false;
  data = [];
  total = 0;
  pagesizeAry = [16, 32, 48];
  theads = [
    { name: '类型', value: 'type' },
    { name: '积分', value: 'point' },
    { name: '金额（元）', value: 'money' },
    { name: '数量', value: 'total' },
    { name: '状态', value: 'status' },
  ];
  typeObj = {
    1: '固定红包',
    2: '随机红包'
  }
  statusObj = {
    0: '未生效',
    1: '已生效'
  }
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
    this.serverService.manager__exchange_money_list().subscribe(res => {
      if (res.status === 200) {
        this.data = res['result'];
        this.data.forEach(item => {
          item.money = Number((item.money / 100).toFixed(2));
        })
        this.total = this.data.length;
      }
    })
  }

  change_status(id, status) {
    this.serverService.manager__change_exchange_money_status({ id, status }).subscribe(res => {
      if (res.status === 200) {
        this.nzMessageService.success('兑换红包状态修改成功！');
        this.get_data();
      }
    })
  }

  del_exchange(id) {
    this.serverService.manager__del_exchange_money({ id }).subscribe(res => {
      if (res.status === 200) {
        this.nzMessageService.success('兑换红包删除成功！');
        this.get_data();
      }
    })
  }

  show_modal(data?) {
    const modal = this.modalService.create({
      nzTitle: data ? '兑换红包详情' : '添加兑换红包',
      nzContent: AddExchangeComponent,
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
