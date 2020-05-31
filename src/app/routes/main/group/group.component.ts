import { Component, OnInit } from '@angular/core';
import { ServerService } from '@core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html'
})
export class GroupComponent implements OnInit {
  type = true; // true 正常状态  false 编辑状态
  data = [];
  shopOption = [];
  shopObj = {};
  constructor(
    private serverService: ServerService,
    private nzMessageService: NzMessageService
  ) {
    this.get_inside_shop();
  }

  ngOnInit() {
    this.get_data();
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

  get_data() {
    this.type = true;
    this.serverService.goods__group_list({}).subscribe(res => {
      if (res['status'] === 200) {
        this.data = res['result'];
        this.data.forEach(item => item['type'] = true);
      }
    })
  }

  add(data?) {
    if (data) {
      data.loading = true;
      this.serverService.goods__edit_group({ name: data.name, shop_id: data.shop_id }).subscribe(res => {
        data.loading = false;
        if (res.result) this.get_data();
      }, error => {
        data.loading = false;
      })
    } else {
      this.type = false;
      let data = [...this.data];
      this.data = [...data, {
        name: '',
        shop_id: null,
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
    this.serverService.goods__del_group({ id }).subscribe(res => {
      if (res['status'] === 200) this.get_data();
    })
  }

  cancel() {

  }

  edit(data) {
    let name = data.name, shop_id = data.shop_id;
    data['_name'] = name;
    data['_shop_id'] = shop_id;
    data.type = false;
  }

  make_cancel(data) {
    data.name = data._name;
    data.type = true;
  }

  make_sure(data) {
    data['loading'] = true;
    this.serverService.goods__edit_group({
      id: data.id,
      name: data.name,
      shop_id: data.shop_id
    }).subscribe(res => {
      if (res['status'] === 200) this.get_data();
    }, error => {
      data['loading'] = false;
    })
  }

  change_group_show(id, show) {
    this.serverService.goods__change_group_show({ id, show }).subscribe(res => {
      if (res['status'] === 200) this.get_data();
    })
  }
}
