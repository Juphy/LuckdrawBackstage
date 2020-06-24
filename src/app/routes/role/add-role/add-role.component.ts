import { Component, OnInit, Input } from '@angular/core';
import { ServerService, Options } from '@core';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
})
export class AddRoleComponent implements OnInit {
  validateForm: FormGroup;
  Options = [];
  btnLoading = false;
  @Input() data: any;
  constructor(
    private serverService: ServerService,
    private nzMessageService: NzMessageService,
    private nzModelRef: NzModalRef,
    private fb: FormBuilder
  ) {
    this.serverService.role__permissions().subscribe(res => {
      this.Options = [...res];
    })
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      permissions: [null, [Validators.required]]
    });
    if (this.data) {
      this.serverService.role__info({ id: this.data.id }).subscribe(res => {
        res = res['result'];
        this.validateForm.get('name').setValue(res.name);
        this.validateForm.get('permissions').setValue(res.permissions.map(item => item.id));
      })
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
    let params: any = {
      name: this.validateForm.get('name').value,
      permissions: this.validateForm.get('permissions').value
    };
    this.btnLoading = true;
    if (!this.data) {
      this.serverService.role__add(params).subscribe(res => {
        this.btnLoading = false;
        if (res.status === 200) {
          this.nzMessageService.success('角色添加成功！');
          this.nzModelRef.destroy(true);
        }
      }, err => {
        this.btnLoading = false;
      })
    } else {
      params['id'] = this.data.id;
      this.serverService.role__edit(params).subscribe(res => {
        this.btnLoading = false;
        if (res.status === 200) {
          this.nzMessageService.success('角色编辑成功！');
          this.nzModelRef.destroy(true);
        }
      }, err => {
        this.btnLoading = false;
      })
    }

  }
}
