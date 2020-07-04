import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ServerService, MessageService } from '@core';
import { Options } from '@core';
import { DetailComponent } from '../detail/detail.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
})
export class GoodsComponent implements OnInit {
  searchItems = [
    { name: '订单状态', value: 'status', type: 'number', class: "option", span: 6 },
    { name: '店铺', value: 'shop_id', type: 'number', class: "option", span: 6 },
    { name: '订单编号', value: 'order_no', type: 'text', class: "input", span: 6 },
    { name: '收件人姓名', value: 'receiver_name', type: 'string', class: "input", span: 6 },
    { name: '收件人手机号', value: 'receiver_phone', type: 'string', class: "input", span: 6 },
    { name: '下单时间', value: 'date', type: 'string', class: "date", span: 8 }
  ];
  loading = false;
  searchData = {
    page: 1,
    pagesize: 16,
    status: null,
    date: null,
    shop_id: null,
    order_no: '',
    receiver_name: '',
    phone: ''
  };
  data = [];
  total = 0;
  pagesizeAry = [16, 32, 48];
  theads = [
    { name: '订单编号', value: 'order_no' },
    { name: '下单时间', value: 'order_time' },
    { name: '商品名称', value: 'goods_name' },
    { name: '所属店铺', value: 'shop' },
    { name: '应付价格（元）', value: 'goods_price' },
    { name: '购买数量', value: 'goods_num' },
    { name: '实付金额（元）', value: 'real_price' },
    { name: '幸运币', value: 'real_point' },
    { name: '优惠价格（元）', value: 'total_real' },
    { name: '收件人姓名', value: 'receiver_name' },
    { name: '收件人手机号', value: 'receiver_phone' }
  ];
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
  shopOption = [];
  shopObj = {};
  flagLoading = false;
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

  get_shops() {
    this.serverService.get_shop_list().subscribe(res => {
      this.shopOption = [...res];
      res.forEach(item => {
        this.shopObj[item.value] = item.name;
      })
    })
  }


  ngOnInit() {
    this.get_data();
  }

  search_shop(name) {
    this.flagLoading = true;
    this.serverService.shop__search({ name }).subscribe(res => {
      this.flagLoading = false;
      res = res['result'];
      this.shopOption = [];
      for (let key in res) [
        this.shopOption.push({
          name: res[key],
          id: Number(key)
        })
      ]
    }, err => {
      this.flagLoading = false;
    })
  }


  get_data(flag?: boolean) {
    if (flag) this.searchData.page = 1;
    let params = {
      page: this.searchData.page,
      pagesize: this.searchData.pagesize
    };
    for (let key of ['status', 'shop_id', 'order_no', 'receiver_name', 'receiver_phone']) {
      if (this.searchData[key]) params[key] = this.searchData[key];
    }
    if (this.searchData.date) {
      let date = this.searchData.date;
      if (date[0]) params['start_time'] = formatDate(date[0], 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
      if (date[1]) params['end_time'] = formatDate(date[1], 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
    }
    this.loading = true;
    this.serverService.order__goods_lists(params).subscribe(res => {
      this.loading = false;
      if (res.status === 200) {
        res = res.result;
        this.data = res.data;
        this.total = res['pageinfo']['total'];
        this.data.forEach(item => {
          let status = item.status;
          item = Object.assign(item, item.spu_info);
          item['status'] = status;
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
      status: null,
      date: null,
      shop_id: null,
      order_no: '',
      receiver_name: '',
      phone: ''
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
