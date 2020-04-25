import { Component, OnInit } from '@angular/core';
import { ServerService } from '@core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
  type = true; // true 正常状态  false 编辑状态
  data = [];
  constructor(
    private serverService: ServerService,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit() {
    this.get_data();
  }

  get_data() {
    this.type = true;
    this.serverService.goods__category_list({}).subscribe(res => {
      if (res['status'] === 200) {
        this.data = res['result'];
        this.data.forEach(item => item['type'] = true);
      }
    })
  }

  add(data?) {
    if (data) {
      data.loading = true;
      this.serverService.goods__edit_category({ name: data.category_name }).subscribe(res => {
        data.loading = false;
        if (res.result) this.get_data();
      }, error => {
        data.loading = false;
      })
    } else {
      this.type = false;
      let data = [...this.data];
      this.data = [...data, {
        category_name: '',
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
    this.serverService.goods__del_category({ id }).subscribe(res => {
      if (res['status'] === 200) this.get_data();
    })
  }

  cancel() {

  }

  edit(data) {
    let name = data.category_name;
    data['name'] = name;
    data.type = false;
  }

  make_cancel(data) {
    data.category_name = data.name;
    data.type = true;
  }

  make_sure(data) {
    data['loading'] = true;
    this.serverService.goods__edit_category({
      id: data.id,
      name: data.category_name
    }).subscribe(res => {
      if (res['status'] === 200) this.get_data();
    })
  }
}
