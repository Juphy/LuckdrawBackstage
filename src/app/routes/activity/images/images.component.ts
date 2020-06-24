import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { ServerService, MessageService, Options } from '@core';
import { AddImageComponent } from '../add-image/add-image.component';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html'
})
export class ImagesComponent implements OnInit {
  searchItems = [
    { name: '图片描述', value: 'name', type: 'text', class: 'input', span: 6 },
    { name: '分类', value: 'type', type: 'text', class: 'option', span: 6 }
  ];
  loading = false;
  searchData = {
    page: 1,
    pagesize: 16,
    name: '',
    types: null
  };
  data = [];
  total = 0;
  pagesizeAry = [16, 32, 48];
  theads = [
    { name: '图片', value: 'image' },
    { name: '图片描述', value: 'name' },
    { name: '分类', value: 'types' },
    { name: '图片路径', value: 'img_path' }
  ];
  typesOption = [];
  typesObj = {};
  constructor(
    private modalService: NzModalService,
    private nzMessageService: NzMessageService,
    private serverService: ServerService,
    private message: MessageService
  ) {
    this.typesOption = [...Options.online_gallery];
    this.typesObj = { ...Options.onlineGallery };
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
      if (this.searchData[value]) params[value] = this.searchData[value];
    })
    this.loading = true;
    this.serverService.manager__online_gallery_list(params).subscribe(res => {
      this.loading = false;
      if (res.status === 200) {
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
      pagesize: 16,
      name: '',
      types: null
    };
    this.get_data();
  }

  show_modal() {
    const modal = this.modalService.create({
      nzTitle: '添加图片',
      nzContent: AddImageComponent,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: 960
    });
    modal.afterClose.subscribe(res => {
      if (res) this.get_data();
    })
  }

}
