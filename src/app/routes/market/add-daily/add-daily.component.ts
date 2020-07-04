import { Component, OnInit, Input } from '@angular/core';
import { ServerService, Options } from '@core';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-daily',
  templateUrl: './add-daily.component.html'
})
export class AddDailyComponent implements OnInit {
  validateForm: FormGroup;
  actionTypeOption = [];
  btnLoading = false;
  @Input() data: any;
  constructor(
    private serverService: ServerService,
    private nzMessageService: NzMessageService,
    private nzModelRef: NzModalRef,
    private fb: FormBuilder
  ) {
    this.actionTypeOption = [...Options.action];
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      action_type: [null, [Validators.required]],
      times: [1, [Validators.required]],
      point: [0],
      balance: [0],
      url: [''],
    });
    if (this.data) {
      this.validateForm.get('name').setValue(this.data.name);
      this.validateForm.get('action_type').setValue(this.data.action_type);
      this.validateForm.get('times').setValue(this.data.times);
      this.validateForm.get('point').setValue(this.data.point);
      this.validateForm.get('balance').setValue(this.data.balance);
      this.validateForm.get('url').setValue(this.data.url);
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
    let point = this.validateForm.get('point').value, balance = Number((this.validateForm.get('balance').value * 100).toFixed(0));
    if (!point && !balance) {
      this.nzMessageService.warning('奖励积分和奖励金额不能同时为0！');
      return;
    }
    let params = {
      name: this.validateForm.get('name').value,
      action_type: this.validateForm.get('action_type').value,
      times: this.validateForm.get('times').value,
      point,
      balance,
      url: this.validateForm.get('url').value
    };
    if (this.data) {
      params['id'] = this.data.id;
    }
    this.btnLoading = true;
    this.serverService.manager__edit_daily_tasks(params).subscribe(res => {
      this.btnLoading = false;
      if (res.status === 200) {
        this.nzMessageService.success(this.data ? '每日任务编辑成功！' : '每日任务添加成功！');
        this.nzModelRef.destroy(true);
      }
    }, err => {
      this.btnLoading = false;
    })
  }

}
