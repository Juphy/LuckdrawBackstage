import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ServerService, MessageService, Options } from '@core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {
  searchItems = [
    { name: '店铺类型', value: 'type', type: 'text', class: 'option', span: 6 },
    { name: '所属用户ID', value: 'belong_to_user', type: 'text', class: 'input', span: 6 },
    { name: '店铺名称', value: 'name', type: 'text', class: 'input', span: 6 },
  ];
  loading = false;
  searchData = {
    page: 1,
    pagesize: 16,
    name: '',
    type: null,
    belong_to_user: ''
  };
  data = [];
  total = 0;
  pagesizeAry = [16, 32, 48];
  theads = [
    { name: '店铺名称', value: 'name' },
    { name: '店铺logo', value: 'logo' },
    { name: '简单描述', value: 'describe' },
    { name: '所属用户ID', value: 'belong_to_user' },
    { name: '创建时间', value: 'created_at' },
  ];
  shopTypeOption = [...Options.shop_type];
  shopTypeObj = { ...Options.ShopType };
  constructor(
    private nzMessageService: NzMessageService,
    private serverService: ServerService,
    private message: MessageService
  ) {
    this.message.getShopList().subscribe(res => {
      if (res) this.searchData = { ...res };
    })
  }

  ngOnInit() {
    this.get_data();
  }

  ngOnDestroy(): void {
    this.message.setShopList(this.searchData);
  }

  get_data(flag?: boolean) {
    if (flag) this.searchData.page = 1;
    let params = {
      page: this.searchData.page,
      pagesize: this.searchData.pagesize
    };
    this.searchItems.forEach(item => {
      let value = item.value;
      if (this.searchData[value]) params[value] = this.searchData[value];
    })
    this.loading = true;
    this.serverService.shop__lists(params).subscribe(res => {
      this.loading = false;
      if (res.status === 200) {
        res = res.result;
        this.data = res.data;
        this.total = res['pageinfo']['total'];
        this.data.forEach(item => {
          item['created_at'] = formatDate(new Date(item.created_at), 'yyyy-MM-dd HH:mm:ss', 'en-US');
        })
      }
    }, err => {
      this.loading = false;
    })
  }

  clear_data() {
    this.searchData = {
      page: 1,
      pagesize: 16,
      name: '',
      type: null,
      belong_to_user: ''
    }
  }

}
