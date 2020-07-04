import { Component, OnInit, Input } from '@angular/core';
import { Options, ServerService } from '@core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  current = 0;
  steps = [
    { name: '买家已付款', value: 200 },
    { name: '买家已发货', value: 201 }
  ];
  StatusObj = {};
  editFlag = false;
  shipData = {
    logistic_company_id: '',
    track_number: ''
  };
  companyOption = [];
  address_info: any = {};
  coupon_id: any;
  couponObj: any = {};
  @Input() data: any = { remark: '', images: [] };
  constructor(
    private serverService: ServerService,
    private nzMessageService: NzMessageService,
    private nzModaldef: NzModalRef
  ) {
    this.serverService.home__ogistic_company_list().subscribe(res => {
      this.companyOption = [...res];
    })
    Options.order_status.forEach(item => {
      this.StatusObj[item.value] = item.name;
    })
  }

  ngOnInit() {
    this.address_info = this.data.address_info;
    this.coupon_id = this.data.coupon_id;
    if (this.coupon_id) {
      this.serverService.goods__coupon_info({ id: this.coupon_id }).subscribe(res => {
        this.couponObj = res['result'];
      })
    }
    if (this.data.status >= 400) {
      this.steps = this.steps.concat([
        { name: '申请退款', value: 400 },
        { name: '已退款', value: 401 }
      ])
    }
    this.steps.forEach((item, index) => {
      if (this.data.status == item.value) {
        this.current = index;
      }
    })
  }

  edit_ship() {
    this.serverService.order__edit_logistics({
      order_id: this.data.id,
      logistic_company_id: this.data.logistic_company_id,
      track_number: this.data.track_number
    }).subscribe(res => {
      if (res.status === 200) {
        this.nzMessageService.success('物流信息添加成功！');
        this.nzModaldef.destroy(true);
      }
    })
  }

}
