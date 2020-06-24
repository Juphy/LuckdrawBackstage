import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ServerService, MessageService } from '@core';
import { AddRoleComponent } from '../add-role/add-role.component';
import { formatDate } from '@angular/common';

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
    { name: '状态', value: '_status' },
    { name: '创建时间', value: 'created_at' },
  ];
  Obj = {};
  statusObj = {
    1: '正常',
    2: '禁用'
  };
  constructor(
    private modelService: NzModalService,
    private nzMessageService: NzMessageService,
    private serverService: ServerService,
    private message: MessageService
  ) {
    this.serverService.role__permissions().subscribe(res => {
      res.forEach(item => {
        this.Obj[item.id] = item.name;
      })
    })
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
        this.data.forEach(item => {
          item.created_at = formatDate(item.created_at, 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
          item['_status'] = this.statusObj[item.status];
        })
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

  show_modal(data?) {
    const modal = this.modelService.create({
      nzTitle: data ? '角色详情' : '添加角色',
      nzContent: AddRoleComponent,
      nzFooter: null,
      nzComponentParams: {
        data
      },
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: 960
    });
    modal.afterClose.subscribe(res => {
      if (res) this.get_data();
    })
  }

  change(id, flag) {
    switch (flag) {
      case 0:
        this.serverService.role__valid({ id }).subscribe(res => {
          if (res.status === 200) {
            this.nzMessageService.success('角色禁用成功！');
            this.get_data();
          }
        })
        break;
      case 1:
        this.serverService.role__invalid({ id }).subscribe(res => {
          if (res.status === 200) {
            this.nzMessageService.success('角色恢复成功！');
            this.get_data();
          }
        })
        break;
    }
  }

}
