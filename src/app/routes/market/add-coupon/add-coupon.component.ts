import { Component, OnInit, Input } from '@angular/core';
import { ServerService } from '@core';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss']
})
export class AddCouponComponent implements OnInit {
  current = 0;
  goods_group_scopes = [];
  goods_spu_scopes = [];//
  goods_spu = null;
  shop_id = null;

  GroupData = [];
  GroupOption = [];
  GroupObj = {};
  SpuOption = [];
  goods_spus = []; // 已选择的商品
  validateForm: FormGroup;
  shopOption = [];
  @Input() id: number = 0;
  constructor(
    private serverService: ServerService,
    private nzMessageService: NzMessageService,
    private nzModelRef: NzModalRef,
    private fb: FormBuilder
  ) {
    // this.get_group_list();
    this.get_inside_shop();
  }

  get_inside_shop() {
    this.serverService.shop__inside_shop().subscribe(res => {
      if (res.status === 200) {
        res = res['result'];
        this.shopOption = res.map(item => {
          return {
            id: item.id,
            name: item.name
          }
        })
      }
    })
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      type: [1, [Validators.required]],
      minmum_consumption_price: [0, [Validators.required]],
      preferential_price: [null, [Validators.required]],
      deadline_date: [null, [Validators.required]]
    })
  }

  get_group_list(shop_id) {
    this.serverService.goods__group_list({ shop_id }).subscribe(res => {
      if (res['status'] === 200) {
        this.GroupOption = [...res['result']];
        res['result'].forEach(item => {
          this.GroupObj[item.id] = item.category_name;
        })
      }
    })
  }

  check_goods_spu(e) {
    let spu = this.SpuOption.find(item => item.id == e);
    this.goods_spus = [...this.goods_spus, spu];
  }

  search_spu(goods_name) {
    this.serverService.goods__spu_list({ page: 1, pagesize: 10, goods_name, shop_id: this.shop_id }).subscribe(res => {
      if (res['status'] === 200) {
        res = res['result'];
        this.SpuOption = [...res['data']];
      }
    })
  }

  next_step() {
    this.current++;
  }

  pre_step() {
    this.current--;
  }

  make_sure() {
    console.log(this.goods_group_scopes, this.goods_spus);
    let flag = false;
    for (const i in this.validateForm.controls) {
      let control = this.validateForm.controls[i];
      control.markAsDirty();
      control.updateValueAndValidity();
      if (control.errors && control.errors['required']) {
        if (!control.value) flag = true;
      }
    }
    if (flag) return;
    let goods_spu_scopes = this.goods_spus.map(item => item.id),
      minmum_consumption_price = Number((this.validateForm.get('minmum_consumption_price').value * 100).toFixed(0)),
      type = Number(this.validateForm.get('type').value),
      deadline_date = formatDate(this.validateForm.get('deadline_date').value, 'yyyy-MM-dd', 'en-US'),
      preferential_price;
    switch (type) {
      case 1:
        preferential_price = Number((this.validateForm.get('preferential_price').value * 100).toFixed(0));
        break;
      case 2:
        preferential_price = Number((this.validateForm.get('preferential_price').value * 10).toFixed(0))
        break;
    }
    let params = {
      name: this.validateForm.get('name').value,
      type,
      goods_group_scopes: this.goods_group_scopes,
      goods_spu_scopes,
      minmum_consumption_price,
      deadline_date,
      preferential_price,
      shop_id: this.shop_id
    };
    this.serverService.goods__edit_coupon(params).subscribe(res => {
      console.log(res);
    })
  }

  make_cancel() {
    this.nzModelRef.destroy(false);
  }

}
