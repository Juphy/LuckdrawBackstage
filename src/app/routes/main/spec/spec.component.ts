import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ServerService, MessageService, Options } from '@core';

@Component({
  selector: 'app-spec',
  templateUrl: './spec.component.html'
})
export class SpecComponent implements OnInit {
  type = true; // true 正常状态  false 编辑状态
  data = [];
  visible = false;
  okLoading = false;
  detail: any = {};
  flag = false;
  spec_value = '';
  spec_id: number;
  constructor(
    private nzMessageService: NzMessageService,
    private serverService: ServerService,
    private message: MessageService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.get_data();
  }

  get_data() {
    this.serverService.goods__spec_list({}).subscribe(res => {
      this.data = [...res['result']];
      this.data.forEach(item => item['type'] = true);
    })
  }

  add(data?) {
    if (data) {
      data.loading = true;
      this.serverService.goods__add_spec({ name: data.spec_name }).subscribe(res => {
        data.loading = false;
        if (res.result) this.get_data();
      }, error => {
        data.loading = false;
      })
    } else {
      this.type = false;
      let data = [...this.data];
      this.data = [...data, {
        spec_name: '',
        id: null,
        loading: false
      }]
    }
  }

  remove() {
    this.type = true;
    let data = [...this.data];
    data.pop();
    this.data = [...data];
  }

  confirm(id) {
    this.serverService.goods__del_spec({ id }).subscribe(res => {
      if (res['status'] === 200) this.get_data();
    })
  }

  cancel() {

  }

  edit(data) {
    let spec_name = data.spec_name, id = data.id;
    data['_spec_name'] = spec_name;
    data['_id'] = id;
    data.type = false;
  }

  make_cancel(data) {
    data.spec_name = data._spec_name;
    data.type = true;
  }

  make_sure(data) {
    data['loading'] = true;
    this.serverService.goods__edit_spec({
      id: data.id,
      name: data.spec_name
    }).subscribe(res => {
      if (res['status'] === 200) this.get_data();
    }, error => {
      data['loading'] = false;
    })
  }

  on_confirm() {

  }

  on_cancel() {

  }

  show_modal(data) {
    this.spec_id = data.id;
    this.get_speclist();
  }

  edit_spec_value(data, spec_value_id, spec_value) {
    this.serverService.goods__edit_spec_value({
      spec_id: this.spec_id,
      spec_value_id,
      spec_value
    }).subscribe(res => {
      data['flag'] = false;
      if (res.status === 200) {
        this.nzMessageService.success('规格值修改成功！');
        this.get_speclist();
      }
    }, err => {
      data['flag'] = false;
      this.get_speclist();
    })
  }

  add_spec_value() {
    this.serverService.goods__add_spec_value({
      spec_id: this.detail.id,
      spec_value: this.spec_value
    }).subscribe(res => {
      this.nzMessageService.success('规格值添加成功！');
      this.get_speclist();
    })
  }

  delete_specvalue(id) {
    this.serverService.goods__del_spec_value({ id }).subscribe(res => {
      if (res.status === 200) {
        this.nzMessageService.success('规格值删除成功！');
        this.get_speclist();
      }
    })
  }

  get_speclist() {
    this.serverService.goods__spec_value_list({ spec_id: this.spec_id }).subscribe(res => {
      if (res.status === 200) {
        res = res['result'];
        this.detail = { ...res };
        this.visible = true;
      }
    })
  }
}
