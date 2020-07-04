import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ServerService, MessageService, Options } from '@core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-advertiser',
  templateUrl: './advertiser.component.html'
})
export class AdvertiserComponent implements OnInit {
  searchItems = [
    { name: '广告主', value: 'name', type: 'text', class: "input", span: 6 }
  ];
  loading = false;
  searchData = {
    name: ''
  };
  total = 0;
  pagesizeAry = [16, 32, 48];
  data = [];
  theads = [
    { name: '广告主', value: 'name' },
    { name: '投放广告公司', value: 'company' },
    { name: '联系电话', value: 'phone' },
    { name: 'qq', value: 'qq' }
  ];
  visible = false;
  validateForm: FormGroup;
  flag: boolean = false; // false 添加  true 编辑
  constructor(
    private modalService: NzModalService,
    private nzMessageService: NzMessageService,
    private serverService: ServerService,
    private message: MessageService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.get_data();
  }

  get_data() {
    this.loading = true;
    let params = {};
    if (this.searchData.name) params['name'] = this.searchData.name;
    this.serverService.ads__advertiser_list(params).subscribe(res => {
      this.loading = false;
      res = res['result'];
      this.data = [...res];
      this.total = this.data.length;
    }, err => {
      this.loading = false;
    })
  }

  clear_data() {
    this.searchData.name = '';
    this.get_data();
  }

  show_modal(data?) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      company: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      qq: [''],
      id: [null]
    })
    if (data) {
      this.flag = true;
      this.validateForm.get('name').setValue(data.name);
      this.validateForm.get('company').setValue(data.company);
      this.validateForm.get('phone').setValue(data.phone);
      this.validateForm.get('qq').setValue(data.qq);
      this.validateForm.get('id').setValue(data.id);
    }
    this.visible = true;
  }

  make_sure() {
    let flag = false;
    for (const i in this.validateForm.controls) {
      let control = this.validateForm.controls[i];
      control.markAsDirty();
      control.updateValueAndValidity();
      if (control.errors && control.errors['required']) {
        if (!control.value) flag = true
      }
    }
    if (flag) return;
    let params = {
      name: this.validateForm.get('name').value,
      company: this.validateForm.get('company').value,
      phone: this.validateForm.get('phone').value,
      qq: this.validateForm.get('qq').value || ''
    };
    let id = this.validateForm.get('id').value;
    if (id) params['id'] = id;
    this.serverService.ads__edit_advertiser(params).subscribe(res => {
      if (res['status']) {
        this.nzMessageService.success(id ? '广告主编辑成功！' : '广告主添加成功！');
        this.visible = false;
        this.flag = false;
        this.get_data();
      }
    })
  }

}
