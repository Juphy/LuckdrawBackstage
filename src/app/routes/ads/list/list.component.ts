import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ServerService, MessageService } from '@core';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  searchItems = [
    { name: '优惠券名称', value: 'name', type: 'text', class: "input", span: 6 }
  ];
  loading = false;
  searchData = {
    page: 1,
    pagesize: 16,
    name: ''
  };
  data = [];
  total = 0;
  pagesizeAry = [16, 32, 48];
  theads = [
    { name: '名称', value: 'name' }
  ];
  constructor(
    private modelService: NzModalService,
    private nzMessageService: NzMessageService,
    private serverService: ServerService,
    private message: MessageService
  ) {
    this.message.getAdList().subscribe(res => {
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
    this.loading = true;
    this.serverService.ads__list(params).subscribe(res => {
      this.loading = false;
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
      name: ''
    }
    this.get_data();
  }

  show_modal(id) {
    const modal = this.modelService.create({
      nzTitle: id ? '编辑广告' : '添加广告',
      nzContent: AddComponent,
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
