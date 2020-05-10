import { Component, OnInit, Input } from '@angular/core';
import { ServerService } from '@core';
import { NzModalRef, isTemplateRef, NzMessageService } from 'ng-zorro-antd';
declare const Number;
@Component({
  selector: 'app-sku',
  templateUrl: './sku.component.html',
  styleUrls: ['./sku.component.scss']
})
export class SkuComponent implements OnInit {
  visible = false;
  okLoading = false;
  specs = [];
  spec_name = '';
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];
  lists = {
    0: '一',
    1: '二',
    2: '三',
    3: '四',
    4: '五'
  };
  loading = true;
  Specs; // option 记录
  SpecsOption = [];
  isLoading = false;
  index = 0;
  Data = [];
  value: string = ''; // 搜索规格名
  flag = false; // 新增规格
  btnLoading = false;
  spec_value = '';
  SpecObj = {}; // 记录各个规格值
  theads = [
    { name: '商品名称', value: 'name', n: 0 },
    { name: '商品价格', value: 'price', n: 0 },
    { name: '商品积分', value: 'point', n: 0 },
    { name: '商品库存', value: 'stock', n: 0 }
  ];
  data = [];
  RowSpan = [];
  Dvalue = {
    name: '',
    price: null,
    point: null,
    stock: null
  };
  Status = 0; // 0 下架 1上架
  spu_id;
  skus = [];
  @Input() id: number = 0;
  constructor(
    private ServerService: ServerService,
    private nzModalRef: NzModalRef,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit() {
    this.ServerService.goods__spu_skus({ id: this.id }).subscribe(res => {
      if (res['status'] === 200) {
        res = res['result'];
        this.Status = res['status'];
        this.spu_id = res['id'];
        this.skus = res.skus;
        let specs = res['specs'];
        this.Specs = specs.map(item => item.spec_id);
        this.ServerService.goods__spec_list({}).subscribe(_res => {
          if (_res.status === 200) {
            _res = _res.result;
            specs.forEach(item => {
              let spec = _res.find(d => d.id === item.spec_id);
              let spec_valus = spec.spec_values, specObj = {};
              spec_valus.forEach(item => {
                specObj[item.id] = item.spec_value
              })
              this.specs = [...this.specs, {
                id: item.spec_id,
                name: item.spec_name,
                option: item.values,
                specObj,
                values: [...spec_valus],
                flag: false
              }]
            })
            console.log(this.specs);
            this.get_data();
          }
        })
      }
    })
  }

  get_data() {
    this.data = [];
    this.theads = [
      { name: '商品名称', value: 'name', n: 0 },
      { name: '商品价格', value: 'price', n: 0 },
      { name: '商品积分', value: 'point', n: 0 },
      { name: '商品库存', value: 'stock', n: 0 }
    ];
    let _theads = [], rowspan = [];
    [...this.specs].reverse().forEach(item => {
      if (item.option.length) {
        this.SpecObj = Object.assign(this.SpecObj, item.specObj);
        rowspan.unshift(item.option.length);
        if (!this.data.length) {
          item.option.forEach(id => {
            let d = this.skus.shift();
            let obj = {
              name: d ? d.name : '',
              price: d ? Number((d.price / 100).toFixed(2)) : null,
              point: d ? d.point : null,
              stock: d ? d.stock : null
            };
            obj[item.id] = id;
            this.data = [...this.data, obj];
          })
        } else {
          let data = [];
          item.option.forEach(id => {
            this.data.forEach(d => {
              let obj = {};
              obj[item.id] = id;
              data.push(Object.assign({ ...d }, obj));
            })
          })
          this.data = [...data];
        }
        _theads.push({
          name: item.name,
          value: item.id,
          n: 1
        })
      }
    });
    this.theads = [..._theads.reverse(), ...this.theads];
    this.RowSpan = [];
    rowspan.slice(1).reverse().reduce((s1, s2) => {
      if (s1 && s2) {
        this.RowSpan.unshift(s1 * s2);
        return s1 * s2
      }
    }, 1);
  }

  change_allData() {
    this.data = this.data.map(item => {
      for (let key in this.Dvalue) {
        if (this.Dvalue[key]) item[key] = this.Dvalue[key];
      }
      return item;
    })
  }

  save_data() {
    let flag = false, skus = [];
    this.data.forEach((item, index) => {
      for (let key of ['name', 'price', 'point']) {
        if (!item[key]) {
          flag = true;
          this.nzMessageService.error(`第${index + 1}行未填写完整！`);
        }
      }
      let obj = {
        name: item.name,
        price: Number((item.price * 100).toFixed(2)),
        stock: item.stock,
        point: item.point,
        spec_values: []
      };
      this.theads.forEach(t => {
        if (t.n === 1) {
          obj.spec_values.push(item[t.value])
        }
      })
      skus.push(obj);
    })
    if (flag) return;
    this.ServerService.goods__edit_skus({
      spu_id: this.spu_id,
      skus
    }).subscribe(res => {
      if (res['status'] === 200) {
        this.nzModalRef.destroy(true);
      }
    })
  }

  show_modal() {
    this.visible = true;
    this.get_spec_list();
  }

  loadMore() {
    this.index++;
    this.SpecsOption = [...this.SpecsOption, ...this.Data.slice(this.index * 10, (this.index + 1) * 10)];
  }

  onSearch(value: string) {
    if (value && value.length > 1) {
      this.index = 0;
      this.SpecsOption = [...this.Data.filter(item => item.spec_name.includes(value)).slice(this.index * 10, (this.index + 1) * 10)];
    } else {
      this.index = 0;
      this.SpecsOption = [...this.Data.slice(this.index * 10, (this.index + 1) * 10)];
    }
  }

  get_spec_list() {
    this.index = 0;
    this.ServerService.goods__spec_list({}).subscribe(res => {
      if (res['status'] === 200) {
        this.Data = [...res['result']];
        this.SpecsOption = [...this.Data.slice(this.index * 10, (this.index + 1) * 10)];
      }
    })
  }

  handle_cancel() {
    this.visible = false;
  }

  make_sure() {
    let specs = [...this.specs];
    this.specs = [];
    this.Specs.forEach(item => {
      if (!specs.some(s => s.id === item)) {
        let spec = this.Data.find(d => d.id === item);
        let spec_values = spec.spec_values, specObj = {};
        spec_values.forEach(item => {
          specObj[item.id] = item.spec_value
        })
        this.specs = [...this.specs, {
          id: spec.id,
          name: spec.spec_name,
          values: [...spec_values],
          specObj,
          option: [],
          flag: false
        }]
      } else {
        let value = specs.find(s => s.id === item);
        this.specs = [...this.specs, value];
      }
    });
    this.visible = false;
  }

  make_add() {
    this.flag = true;
  }

  add_spec() {
    this.btnLoading = true;
    this.ServerService.goods__add_spec({
      name: this.spec_name,
      values: this.listOfTagOptions
    }).subscribe(res => {
      this.btnLoading = false;
      if (res['status'] === 200) {
        this.Specs = [...this.Specs, res['result']];
        this.get_spec_list();
        this.spec_name = '';
        this.listOfTagOptions = [];
        this.listOfOption = [];
      }
    }, err => {
      this.btnLoading = false
    })
  }

  make_cancel() {
    this.flag = false;
    this.spec_name = '';
    this.listOfTagOptions = [];
    this.listOfOption = [];
  }

  onClose(spec) {
    spec['disabled'] = true;
    console.log(this.specs);
  }

  edit_spec(s) {
    if (this.spec_value === '') {
      s.flag = false;
      return;
    };
    this.ServerService.goods__edit_spec_value({ spec_id: s['id'], spec_value: this.spec_value }).subscribe(res => {
      console.log(res);
      if (res['status'] === 200) {
        res = res['result'];
        let values = [...s['values']], option = [...s['option']];
        if (values.some(item => item.id === res)) {
          if (!option.includes(res)) s['option'] = [...option, res];
        } else {
          s['values'] = [...values, {
            id: res,
            spec_value: this.spec_value
          }];
          s['option'] = [...option, res];
          s['specObj'][res] = this.spec_value;
        }
      }
      s.flag = false;
      this.spec_value = '';
      this.get_data();
    }, err => {
      s.flag = false;
      this.spec_value = '';
    })
  }

  add_spec_value(s) {
    s['flag'] = true;
  }
}
