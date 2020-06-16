import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ServerService, MessageService } from '@core';
import { Options } from '@core';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html'
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
  theads = [
    { name: '订单状态', value: 'status' }
  ];
  statusOption = [];
  statusObj = {};
  constructor(
    private nzMessageService: NzMessageService,
    private serverService: ServerService,
    private message: MessageService
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
  }

}
