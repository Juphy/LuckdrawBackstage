import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { MessageService, ServerService } from '@core';
import { BuildComponent } from '../build/build.component';
import { SpuStatus, SendType, Send_Type, Spu_Status } from '@routes/DATA';
import { formatDate } from '@angular/common';
import { SkuComponent } from '../sku/sku.component';
import { isNumber } from 'util';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit, OnDestroy {
  searchItems = [
    { name: '商品名称', value: 'goods_name', type: 'text', class: "input", span: 6 },
    { name: '商品分类', value: 'category_id', type: 'text', class: "option", span: 6 },
    { name: '商品分组', value: 'groups', type: 'text', class: "option", span: 6 },
    { name: '投递方式', value: 'send_type', type: 'text', class: "option", span: 6 },
    { name: '创建时间', value: 'create', type: 'text', class: "date", span: 8 },
    { name: '所属店铺', value: 'shop_id', type: 'text', class: "option", span: 6 },
    { name: '状态', value: 'status', type: 'text', class: "option", span: 6 },
  ];
  loading = false;
  searchData = {
    page: 1,
    pagesize: 16,
    goods_name: '',
    send_type: null,
    groups: null,
    category_id: null,
    create: null,
    shop_id: null,
    status: null
  };
  data = [];
  total = 0;
  pagesizeAry = [16, 32, 48];
  theads = [
    { name: '商品名称', value: 'goods_name' },
    { name: '商品分类', value: 'category' },
    { name: '商品分组', value: 'groups' },
    { name: '商品图片', value: 'images' },
    { name: '所属店铺', value: 'shop' },
    { name: '投递方式', value: 'send_type' },
    { name: '创建时间', value: 'created_at' },
    { name: '状态', value: 'status' }
  ];
  CategoryOption = [];
  CategoryList = {};
  GroupOption = [];
  GroupList = {};
  SendType = SendType;
  sendtypeOption = Send_Type;
  SpuStatus = SpuStatus;
  shopOption = [];
  shopObj = {};
  flagLoading = false;
  statusOption = [...Spu_Status];
  constructor(
    private modalService: NzModalService,
    private message: MessageService,
    private serverService: ServerService,
    private nzMessageService: NzMessageService
  ) {
    this.message.getSpuList().subscribe(res => {
      if (res) {
        for (let key in res) {
          this.searchData[key] = res[key];
          this.searchData['shop_id'] = null;
        }
      };
    });
    this.get_category_list();
    this.get_group_list();
    this.get_shops();
  }

  get_shops() {
    this.serverService.get_shop_list().subscribe(res => {
      this.shopOption = [...res];
    })
  }

  search_shop(name) {
    this.flagLoading = true;
    this.serverService.shop__search({ name }).subscribe(res => {
      this.flagLoading = false;
      res = res['result'];
      this.shopOption = [];
      for (let key in res) [
        this.shopOption.push({
          name: res[key],
          id: Number(key)
        })
      ]
    }, err => {
      this.flagLoading = false;
    })
  }

  ngOnDestroy(): void {
    this.message.setSpuList(this.searchData);
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
    for (let key of ['goods_name', 'send_type', 'category_id', 'shop_id']) {
      if (this.searchData[key]) params[key] = this.searchData[key];
    }
    if (this.searchData.groups && this.searchData.groups.length) {
      params['groups'] = this.searchData.groups;
    }
    if (isNumber(this.searchData.status)) {
      params['status'] = this.searchData.status;
    }
    if (this.searchData.create) {
      let create = this.searchData.create;
      if (create[0]) params['create_ta'] = formatDate(create[0], 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
      if (create[1]) params['create_tb'] = formatDate(create[1], 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
    }
    this.loading = true;
    this.serverService.goods__spu_list(params).subscribe(res => {
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
      goods_name: '',
      send_type: null,
      groups: null,
      category_id: null,
      create: null,
      shop_id: null,
      status: null
    }
    this.get_data();
  }

  show_modal(id?) {
    const modal = this.modalService.create({
      nzTitle: id ? '编辑商品' : '添加商品',
      nzContent: BuildComponent,
      nzFooter: null,
      nzComponentParams: {
        id
      },
      nzMaskClosable: false,
      nzClosable: true,
      nzWidth: 1280
    });
    modal.afterClose.subscribe(res => {
      if (res) this.get_data();
    })
  }

  show_sku(id) {
    const modal = this.modalService.create({
      nzTitle: '编辑商品规格',
      nzContent: SkuComponent,
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

  get_category_list() {
    this.serverService.goods__category_list({}).subscribe(res => {
      if (res['status'] === 200) {
        this.CategoryOption = [...res['result']];
        res['result'].forEach(item => {
          this.CategoryList[item.id] = item.category_name;
        })
      }
    })
  }

  get_group_list() {
    this.serverService.goods__group_list({}).subscribe(res => {
      if (res['status'] === 200) {
        this.GroupOption = [...res['result']];
        res['result'].forEach(item => {
          this.GroupList[item.id] = item.name;
        })
      }
    })
  }

  change_status(spu_id, status) {
    this.serverService.goods__spu_change_status({ spu_id, status }).subscribe(res => {
      if (res['status'] === 200) {
        this.nzMessageService.success(status === 0 ? '商品下架成功！' : '商品上架成功！');
        this.get_data();
      }
    })
  }

  delete(id) {
    this.serverService.goods__del_spu({ id }).subscribe(res => {
      if (res.status === 200) {
        this.nzMessageService.success('该商品删除成功！');
        this.get_data();
      }
    })
  }
}
