import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ServerService, MessageService, Options } from '@core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ad_Category, AdCategory, Ad_Type, AdType, Ad_Status, AdStatus } from '@routes/DATA';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html'
})
export class PositionComponent implements OnInit {
  data = [];
  total = 0;
  pagesizeAry = [16, 32, 48];
  theads = [
    { name: '广告位置名称', value: 'name' },
    { name: '广告类型', value: '_terminal_id' },
    { name: '广告位置类型', value: '_category' },
    { name: '广告所属界面', value: 'page_name' },
    { name: '广告宽度', value: 'width' },
    { name: '广告高度', value: 'height' },
    { name: '代码', value: 'code' },
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
  terminalOption = [...Options.terminal];
  terminalObj = { ...Options.Terminal };
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
    this.serverService.ads__ad_position_list().subscribe(res => {
      this.loading = false;
      if (res['status'] === 200) {
        res = res['result'];
        this.data = [...res];
        this.data.forEach(item => {
          item['_type'] = this.TypeObj[item.type];
          item['_category'] = this.CategoryObj[item.category];
          item['_terminal_id'] = this.terminalObj[item.terminal_id];
        })
        this.total = this.data.length;
      }
    })
  }

  show_modal(data?) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      terminal_id: [1, [Validators.required]],
      category: [1, [Validators.required]],
      page_name: ['', [Validators.required]],
      width: [null, [Validators.required]],
      height: [null, [Validators.required]],
      code: ['', [Validators.required]],
      item_no: [],
      id: [null]
    })
    if (data) {
      this.flag = true;
      this.validateForm.get('name').setValue(data.name);
      this.validateForm.get('terminal_id').setValue(data.terminal_id);
      this.validateForm.get('category').setValue(data.category);
      this.validateForm.get('page_name').setValue(data.page_name);
      this.validateForm.get('width').setValue(data.width);
      this.validateForm.get('height').setValue(data.height);
      this.validateForm.get('code').setValue(data.code);
      this.validateForm.get('item_no').setValue(data.item_no);
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
      terminal_id: this.validateForm.get('terminal_id').value,
      category: this.validateForm.get('category').value,
      page_name: this.validateForm.get('page_name').value,
      width: this.validateForm.get('width').value,
      height: this.validateForm.get('height').value,
      code: this.validateForm.get('code').value
    };
    if (params.category !== 1) {
      let item_no = this.validateForm.get('item_no').value;
      if (!item_no) {
        this.nzMessageService.warning('请选择动态位/轮播帧位置！');
        return;
      }
      params['item_no'] = item_no;
    }
    let id = this.validateForm.get('id').value;
    if (id) params['id'] = id;
    this.serverService.ads__edit_ad_position(params).subscribe(res => {
      if (res['status']) {
        this.nzMessageService.success(id ? '广告位置编辑成功！' : '广告位置添加成功！');
        this.visible = false;
        this.flag = false;
        this.get_data();
      }
    })
  }

  delete_position(id) {
    this.serverService.ads__del_ad_position({ id }).subscribe(res => {
      if (res.status === 200) {
        this.nzMessageService.success('广告位置删除成功！');
      }
    })
  }

  cancel() {

  }

  change_status(e, id) {
    this.serverService.ads__ad_position_info({
      id,
      status: e ? 1 : 0
    }).subscribe(res => {
      if (res.status === 200) {
        this.nzMessageService.success('广告位置状态修改成功！');
      } else {
        this.get_data()
      }
    }, error => {
      this.get_data();
    })
  }
}
