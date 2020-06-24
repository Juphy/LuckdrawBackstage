import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddCouponComponent } from '../add-coupon/add-coupon.component';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ServerService, MessageService } from '@core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html'
})
export class CouponComponent implements OnInit, OnDestroy {
  searchItems = [
    { name: '优惠券名称', value: 'name', type: 'text', class: "input", span: 6 }
  ];
  loading = false;
  searchData = {
    page: 1,
    pagesize: 16,
    name: ''
  };
  data = [];
  total = 0;
  pagesizeAry = [16, 32, 48];
  theads = [
    { name: '优惠券名称', value: 'name' },
    { name: '优惠券类型', value: 'type' },
    { name: '最低金额限度（元）', value: 'minmum_consumption_price' },
    { name: '截止日期', value: 'deadline_date' },
    { name: '创建人', value: 'creator_name' },
    { name: '创建时间', value: 'created_at' },
    { name: '状态', value: 'status' },
  ];
  obj = {
    0: '零',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '七',
    8: '八',
    9: '九'
  };
  status = {
    0: '生效',
    1: '失效'
  };
  constructor(
    private modalService: NzModalService,
    private nzMessageService: NzMessageService,
    private serverService: ServerService,
    private message: MessageService
  ) {
    this.message.getCouponList().subscribe(res => {
      if (res) this.searchData = { ...res };
    })
  }

  ngOnDestroy(): void {
    this.message.setCouponList(this.searchData);
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
    this.loading = true;
    this.serverService.goods__coupon_list(params).subscribe(res => {
      this.loading = false;
      if (res['status'] === 200) {
        res = res['result'];
        this.data = res['data'];
        this.total = res['pageinfo']['total'];
        this.data.forEach(item => {
          item.created_at = formatDate(item.created_at, 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
          if (item.type === 2) {
            item.preferential_price = (item.preferential_price / 10).toFixed(1).split('.');
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
      pagesize: this.searchData.pagesize,
      name: ''
    };
    this.get_data();
  }

  show_modal(data?) {
    const modal = this.modalService.create({
      nzTitle: data ? '查看优惠券' : '添加优惠券',
      nzContent: AddCouponComponent,
      nzFooter: null,
      nzComponentParams: {
        data
      },
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: 1200
    });
    modal.afterClose.subscribe(res => {
      if (res) this.get_data();
    })
  }

  change_status(id, status) {
    this.serverService.goods__change_coupon_status({ id, status }).subscribe(res => {
      if (res.status === 200) {
        this.nzMessageService.success(`优惠券状态已修改！`);
      }
    })
  }

}
