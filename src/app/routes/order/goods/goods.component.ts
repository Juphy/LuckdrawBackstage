import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ServerService, MessageService } from '@core';
import { Options } from '@core';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
})
export class GoodsComponent implements OnInit {
  searchItems = [
    { name: '订单状态', value: 'status', type: 'number', class: "option", span: 6 }
  ];
  loading = false;
  searchData = {
    page: 1,
    pagesize: 16,
    status: null
  };
  data = [];
  total = 0;
  pagesizeAry = [16, 32, 48];
  theads = [];
  statusOption = [];
  statusObj = {};
  goodsTypeOption = [
    { name: '兑换商品', value: 1 },
    { name: '奖品商品', value: 2 }
  ];
  goodsTypeObj = {
    1: '兑换商品',
    2: '奖品商品'
  };
  paytypeOption = [
    { name: '平台幸运币', value: 0 },
    { name: '微信', value: 10 },
    { name: '微信混合支付', value: 11 }
  ];
  paytypeObj = {
    0: '平台幸运币',
    10: '微信',
    11: '微信混合支付'
  };
  constructor(
    private nzMessageService: NzMessageService,
    private serverService: ServerService,
    private message: MessageService,
    private modalService: NzModalService
  ) {
    Options.order_status.forEach(item => {
      this.statusOption.push({
        name: item.name,
        value: item.value
      })
      this.statusObj[item.value] = item.name;
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
      let value = item.value;
      if (this.searchData[value]) params[value] = this.searchData[value];
    })
    this.loading = true;
    this.serverService.order__goods_lists(params).subscribe(res => {
      this.loading = false;
      if (res.status === 200) {
        res = res.result;
        this.data = res.data;
        this.total = res['pageinfo']['total'];
        this.data = this.data.map(item => {
          return Object.assign(item.spu_info, item)
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
      status: null
    }
    this.get_data(true);
  }

  show_modal(data) {
    const modal = this.modalService.create({
      nzTitle: '订单详情',
      nzContent: DetailComponent,
      nzFooter: null,
      nzComponentParams: {
        data
      },
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: 1200
    })
    modal.afterClose.subscribe(res => {
      if (res) this.get_data(true);
    })
  }

}
