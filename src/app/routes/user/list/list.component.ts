import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ServerService, MessageService } from '@core';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  searchItems = [
    { name: '角色状态', value: 'status', type: 'text', class: "input", span: 6 }
  ];
  loading = false;
  searchData = {
    page: 1,
    pagesize: 16,
    status: ''
  };
  data = [];
  total = 0;
  pagesizeAry = [16, 32, 48];
  theads = [
    { name: '角色名称', value: 'name' },
    { name: '角色状态', value: 'status' },
  ];
  constructor(
    private modelService: NzModalService,
    private nzMessageService: NzMessageService,
    private serverService: ServerService,
    private message: MessageService
  ) {
    this.message.getRoleList().subscribe(res => {
      if (res) this.searchData = { ...res };
    })
  }

  ngOnInit() {
    this.get_data();
  }

  get_data(flag?: boolean) {
    if (flag) this.searchData.page = 1;
    let params = {
      page: this.searchData.page,
      pagesize: this.searchData.pagesize
    };
    this.searchItems.forEach(item => {
      let value = item.value;
      switch (value) {
        default:
          if (this.searchData[value]) params[value] = this.searchData[value];
          break;
      }
    })
    this.loading = true;
    this.serverService.role__list(params).subscribe(res => {
      this.loading = true;
      if (res['status'] === 200) {
        res = res['result'];
        this.data = res['data'];
        this.total = res['pageinfo']['total'];
      }
    }, err => {
      this.loading = false;
    })
  }

  clear_data() {
    this.searchData = {
      page: 1,
      pagesize: this.searchData.pagesize,
      status: ''
    }
    this.get_data();
  }

  show_modal(id?) {
    const modal = this.modelService.create({
      nzTitle: id ? '角色详情' : '添加角色',
      nzContent: AddUserComponent,
      nzFooter: null,
      nzComponentParams: {
        id
      },
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: 960
    });
    modal.afterClose.subscribe(res => {
      if (res) this.get_data();
    })
  }


}
