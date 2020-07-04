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
  goods_spu_scopes = [];
  goods_spu = null;
  shop_id = null;

  GroupData = [];
  GroupOption = [];
  GroupObj = {};
  SpuOption = [];
  // goods_spus = []; // 已选择的商品
  validateForm: FormGroup;
  shopOption = [];
  option1 = [
    { name: '零', value: '0' },
    { name: '一', value: '1' },
    { name: '二', value: '2' },
    { name: '三', value: '3' },
    { name: '四', value: '4' },
    { name: '五', value: '5' },
    { name: '六', value: '6' },
    { name: '七', value: '7' },
    { name: '八', value: '8' },
    { name: '九', value: '9' },
  ];
  option2 = [
    { name: '零', value: '0' },
    { name: '一', value: '1' },
    { name: '二', value: '2' },
    { name: '三', value: '3' },
    { name: '四', value: '4' },
    { name: '五', value: '5' },
    { name: '六', value: '6' },
    { name: '七', value: '7' },
    { name: '八', value: '8' },
    { name: '九', value: '9' },
  ];
  op1 = null;
  op2 = null;
  @Input() data: any = {};
  constructor(
    private serverService: ServerService,
    private nzMessageService: NzMessageService,
    private nzModelRef: NzModalRef,
    private fb: FormBuilder
  ) {
    // this.get_group_list();
    this.get_inside_shop();
  }

  add() {
    let obj = this.SpuOption.find(item => item.id === this.goods_spu);
    this.goods_spu_scopes = this.goods_spu_scopes.concat(obj);
  }

  remove(id) {
    this.goods_spu_scopes = this.goods_spu_scopes.filter(item => item.id !== id);
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
      minmum_consumption_price: [null, [Validators.required]],
      preferential_price: [null],
      deadline_date: [null, [Validators.required]]
    })
    if (this.data) {
      this.shop_id = this.data.shop_id;
      this.get_group_list(this.shop_id);
      this.goods_group_scopes = this.data.goods_group_scopes;
      this.validateForm.get('name').setValue(this.data.name);
      this.validateForm.get('type').setValue(this.data.type);
      if (this.data.type === 1) {
        this.validateForm.get('preferential_price').setValue(Number((this.data.preferential_price / 100).toFixed(2)));
      }

      if (this.data.type === 2) {
        this.op1 = this.data.preferential_price[0];
        this.op2 = this.data.preferential_price[1];
      }
      this.validateForm.get('minmum_consumption_price').setValue(Number((this.data.minmum_consumption_price / 100).toFixed(2)));
      this.validateForm.get('deadline_date').setValue(new Date(this.data.deadline_date));
      this.serverService.goods__coupon_info({ id: this.data.id }).subscribe(res => {
        this.goods_spu_scopes = res['result']['goods_spu_scopes'];
      })
    }
  }

  get_group_list(shop_id) {
    if (!shop_id) return;
    this.goods_group_scopes = [];
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
    if (!this.goods_spu) return;
    if (!this.goods_spu_scopes.some(item => item.id === this.goods_spu)) {
      let obj = this.SpuOption.find(item => item.id === this.goods_spu);
      this.goods_spu_scopes = this.goods_spu_scopes.concat(obj);
    }
  }

  search_spu(goods_name) {
    if (!this.shop_id) {
      this.nzMessageService.error('没有选择店铺！');
      return;
    }
    this.serverService.goods__spu_list({ page: 1, pagesize: 10, goods_name, shop_id: this.shop_id }).subscribe(res => {
      if (res['status'] === 200) {
        res = res['result'];
        this.SpuOption = [...res['data']];
      }
    })
  }

  next_step() {
    if (!this.shop_id) {
      this.nzMessageService.warning('没有选择店铺！');
      return;
    }
    if (!this.goods_group_scopes.length && !this.goods_spu_scopes.length) {
      this.nzMessageService.warning('没有选择商品分组或者商品！');
      return;
    }
    this.current++;
  }

  pre_step() {
    this.current--;
  }

  make_sure() {
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
    let goods_spu_scopes = this.goods_spu_scopes.map(item => item.id),
      minmum_consumption_price = Number((this.validateForm.get('minmum_consumption_price').value * 100).toFixed(0)),
      type = Number(this.validateForm.get('type').value),
      deadline_date = formatDate(this.validateForm.get('deadline_date').value, 'yyyy-MM-dd', 'zh-Hans'),
      preferential_price;
    switch (type) {
      case 1:
        preferential_price = Number((this.validateForm.get('preferential_price').value * 100).toFixed(0));
        if (!this.validateForm.get('preferential_price').value) {
          preferential_price = false;
        }
        break;
      case 2:
        if (!this.op1) {
          preferential_price = false;
        }
        preferential_price = Number(this.op1 + (this.op2 ? this.op2 : '0'));
        break;
    }
    if (preferential_price === false) {
      this.nzMessageService.warning('请选择折扣或者填写优惠额度！');
      return;
    }
    let params = {
      name: this.validateForm.get('name').value,
      type,
      minmum_consumption_price,
      deadline_date,
      preferential_price,
      shop_id: this.shop_id
    };
    if (this.goods_group_scopes.length) {
      params['goods_group_scopes'] = this.goods_group_scopes;
    }
    if (goods_spu_scopes.length) {
      params['goods_spu_scopes'] = goods_spu_scopes
    }
    if (this.data) {
      params['id'] = this.data.id;
    }
    this.serverService.goods__edit_coupon(params).subscribe(res => {
      if (res.status === 200) {
        this.nzMessageService.success('优惠券添加成功！');
        this.nzModelRef.destroy(true);
      }
    })
  }

  make_cancel() {
    this.nzModelRef.destroy(false);
  }

}
