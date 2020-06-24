import { Component, OnInit, Input } from '@angular/core';
import { ServerService, Options } from '@core';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html'
})
export class AddMoneyComponent implements OnInit {
  validateForm: FormGroup;
  typeOption = [];
  btnLoading = false;
  @Input() data: any;
  constructor(
    private serverService: ServerService,
    private nzMessageService: NzMessageService,
    private nzModelRef: NzModalRef,
    private fb: FormBuilder
  ) {
    this.serverService.activity__type_list().subscribe(res => this.typeOption = [...res]);
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      activity_type: [null, [Validators.required]],
      hours: [0, [Validators.required]],
      handler_price: [0, [Validators.required]],
      real_price: [0, [Validators.required]]
    })
    if (this.data) {
      this.validateForm.get('activity_type').setValue(this.data.activity_type);
      this.validateForm.get('hours').setValue(this.data.hours);
      this.validateForm.get('handler_price').setValue(this.data.handler_price);
      this.validateForm.get('real_price').setValue(this.data.real_price);
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
    let params = {
      activity_type: this.validateForm.get('activity_type').value,
      hours: this.validateForm.get('hours').value * 24,
      handler_price: Number((this.validateForm.get('handler_price').value * 100).toFixed(0)),
      real_price: Number((this.validateForm.get('real_price').value * 100).toFixed(0))
    };
    if (this.data) {
      params['id'] = this.data.id;
    }
    this.btnLoading = true;
    this.serverService.activity__edit_times(params).subscribe(res => {
      this.btnLoading = false;
      if (res.status === 200) {
        this.nzMessageService.success(this.data ? '活动时长编辑成功！' : '活动时长添加成功！');
        this.nzModelRef.destroy(true);
      }
    }, err => {
      this.btnLoading = false;
    })
  }

  format_money = (value: number) => value ? Number(value.toFixed(2)) : 0;
  format_day = (value: number) => value ? Number(value.toFixed(0)) : 0;
}
