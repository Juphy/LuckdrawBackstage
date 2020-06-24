import { Component, OnInit, Input } from '@angular/core';
import { ServerService, Options } from '@core';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-exchange',
  templateUrl: './add-exchange.component.html'
})
export class AddExchangeComponent implements OnInit {
  validateForm: FormGroup;
  typeOption = [
    { name: '固定红包', value: 1 },
    { name: '随机红包', value: 2 }
  ];
  typeObj = {
    1: '固定红包',
    2: '随机红包'
  }
  btnLoading = false;
  @Input() data: any;
  constructor(
    private serverService: ServerService,
    private nzMessageService: NzMessageService,
    private nzModelRef: NzModalRef,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      type: [null, [Validators.required]],
      total: [1, [Validators.required]],
      point: [0],
      money: [0]
    });
    if (this.data) {
      this.validateForm.get('type').setValue(this.data.type);
      this.validateForm.get('total').setValue(this.data.total);
      this.validateForm.get('point').setValue(this.data.point);
      this.validateForm.get('money').setValue(this.data.money);
    }
  }

  make_cancel() {
    this.nzModelRef.destroy(false);
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
    let point = this.validateForm.get('point').value, money = Number((this.validateForm.get('money').value * 100).toFixed(0));
    if (!point && !money) {
      this.nzMessageService.warning('奖励积分和奖励金额不能同时为空！');
      return;
    }
    let params = {
      type: this.validateForm.get('type').value,
      total: this.validateForm.get('total').value,
      point,
      money
    };
    if (this.data) {
      params['id'] = this.data.id;
    }
    this.btnLoading = true;
    this.serverService.manager__edit_exchange_money(params).subscribe(res => {
      this.btnLoading = false;
      if (res.status === 200) {
        this.nzMessageService.success(this.data ? '兑换红包编辑成功！' : '兑换红包添加成功！');
        this.nzModelRef.destroy(true);
      }
    }, err => {
      this.btnLoading = false;
    })
  }

}
