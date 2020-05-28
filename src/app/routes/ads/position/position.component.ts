import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ServerService, MessageService } from '@core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ad_Category, AdCategory, Ad_Type, AdType, Ad_Status, AdStatus } from '@routes/DATA';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {
  data = [];
  theads = [
    { name: '广告位置名称', value: 'name' },
    { name: '广告类型', value: 'type' },
    { name: '广告位置类型', value: 'category' },
    { name: '状态', value: 'status' }
  ];
  loading = false;
  visible = false;
  validateForm: FormGroup;
  CategoryOption = [...Ad_Category];
  CategoryObj = AdCategory;
  TypeOption = [...Ad_Type];
  TypeObj = AdType;
  StatusOption = [...Ad_Status];
  StatusObj = AdStatus;
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
    this.serverService.ads__ad_position_list().subscribe(res => {
      this.loading = false;
      if (res['status'] === 200) {
        res = res['result'];
        this.data = [...res];
      }
    })
  }

  show_modal(data?) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      type: [1, [Validators.required]],
      category: [1, [Validators.required]],
      status: [1, [Validators.required]],
      id: [null]
    })
    if (data) {
      this.validateForm.get('name').setValue(data.name);
      this.validateForm.get('type').setValue(data.type);
      this.validateForm.get('category').setValue(data.category);
      this.validateForm.get('status').setValue(data.status);
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
      category: this.validateForm.get('category').value,
      type: this.validateForm.get('type').value,
      status: this.validateForm.get('status').value
    };
    let id = this.validateForm.get('id').value;
    if (id) params['id'] = id;
    this.serverService.ads__edit_ad_position(params).subscribe(res => {
      if (res['status']) {
        this.nzMessageService.success(id ? '广告位置编辑成功！' : '广告位置添加成功！');
      }
    })
  }
}
