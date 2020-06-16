import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ServerService, MessageService } from '@core';
import { AddRoleComponent } from '../add-role/add-role.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit, OnDestroy {
  searchItems = [
    { name: '角色状态', value: 'status', type: 'text', class: "input", span: 6 }
  ];
  loading = false;
  searchData = {
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

  ngOnDestroy(): void {
    this.message.setRoleList(this.searchData);
  }

  get_data() {
    let params = {};
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
      this.loading = false;
      if (res['status'] === 200) {
        this.data = res['result'];
        this.total = this.data.length;
      }
    }, err => {
      this.loading = false;
    })
  }

  clear_data() {
    this.searchData = {
      status: ''
    }
    this.get_data();
  }

  show_modal(id?) {
    const modal = this.modelService.create({
      nzTitle: id ? '角色详情' : '添加角色',
      nzContent: AddRoleComponent,
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
