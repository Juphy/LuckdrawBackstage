import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ServerService } from '@core';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { UploadFile } from 'ng-zorro-antd/upload';
import { HttpClient } from '@angular/common/http';
import { Ad_Type, AdType, Url_Type, UrlType } from '@routes/DATA';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `img {
      display: block;
      max-width: 100%;
    }`
  ]
})
export class AddComponent implements OnInit, AfterViewInit {
  validateForm: FormGroup;
  fileList = [];
  img_path = '';
  cropper: any;
  visible = false;
  okLoading = false;
  imageUrl: any = '/assets/images/body.jpg';

  positionOption = [];
  positionObj = {};
  adTypeOption = [...Ad_Type];
  adTypeObj = { ...AdType };
  adUrlOption = [...Url_Type];
  adUrlObj = { ...UrlType };
  advertiserOption = [];
  advertiserObj = {};
  loading = false;
  @Input() id: Number = 0;
  constructor(
    private serverService: ServerService,
    private nzMessageService: NzMessageService,
    private nzModelRef: NzModalRef,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.get_adposition();
    this.get_advertiser();
  }

  format_money = (value: number) => value ? Number(value.toFixed(2)) : null;
  format_day = (value: number) => value ? Number(value.toFixed(0)) : null;

  ngOnInit() {
    this.validateForm = this.fb.group({
      position_id: [null, [Validators.required]],
      advertiser_id: [null, [Validators.required]],
      billing_method: [1, [Validators.required]],

      // image: [null, [Validators.required]],
      name: [null, [Validators.required]],

      url_name: ['', [Validators.required]],
      url_type: [null, [Validators.required]],
      url_path: ['', [Validators.required]],
      url_id: [null],
      start_date: [null, [Validators.required]],
      end_date: [null],
      sort: [null, [Validators.required]],

      buy_click_num: [null],
      buy_reach_num: [null],
      price: ['', [Validators.required]],
      id: [null]
    });
  }

  ngAfterViewInit(): void {
    if (this.id) {
      this.serverService.ads__ads_info({ id: this.id }).subscribe(res => {
        if (res['status'] === 200) {
          res = res['result'];
          this.validateForm.get('name').setValue(res['name']);
          this.validateForm.get('url_name').setValue(res['url_name']);
          this.validateForm.get('url_type').setValue(res['url_type']);
          this.validateForm.get('url_path').setValue(res['url_path']);
          this.validateForm.get('url_id').setValue(res['url_id']);
          this.validateForm.get('sort').setValue(res['sort']);

          this.validateForm.get('position_id').setValue(res['position_id']);
          this.validateForm.get('advertiser_id').setValue(res['advertiser_id']);
          this.validateForm.get('billing_method').setValue(res['billing_method']);
          this.validateForm.get('buy_click_num').setValue(res['buy_click_num']);
          this.validateForm.get('buy_reach_num').setValue(res['buy_reach_num']);
          this.validateForm.get('price').setValue(Number((res['price'] / 100).toFixed(2)));
          this.validateForm.get('id').setValue(res['id']);
          this.img_path = res['image'];

          this.validateForm.get('start_date').setValue(new Date(res['start_date']));
          if (res.end_date) this.validateForm.get('end_date').setValue(new Date(res['end_date']));
        }
      })
    }
  }

  beforeUpload = (file: UploadFile): boolean => {
    let position_id = this.validateForm.get('position_id').value;
    if (!position_id) {
      this.nzMessageService.warning('请选择广告位置！')
      return false;
    }
    let position: any = this.positionObj[position_id];
    this.visible = true;
    setTimeout(() => {
      const image: any = document.getElementById('image');
      console.log(image);
      if (file) {
        image['src'] = URL.createObjectURL(file);
      }
      if (this.cropper) this.cropper.destroy();
      this.cropper = new Cropper(image, {
        aspectRatio: position.width / position.height,
        zoomable: true,
        zoomOnWheel: false,
        viewMode: 1
      })
    })
    return false;
  }

  handle_no() {
    this.visible = false;
    this.okLoading = false;
  }

  handle_ok() {
    this.okLoading = true;
    const result = this.cropper.getCroppedCanvas(
      { "maxWidth": 4096, "maxHeight": 4096, fillColor: "#fff" }
    );
    result.toBlob((blob) => {
      let formData = new FormData();
      formData.append('img_path', blob, 'ab.png');
      this.http.post('ucs/upload_img', formData).subscribe(res => {
        this.okLoading = false;
        if (res['status'] === 200) {
          this.img_path = res['result'];
          this.visible = false;
        }
      }, err => {
        this.okLoading = false;
      })
    })
  }

  disabledStartDate = (startValue: Date): boolean => {
    let endValue = this.validateForm.get('end_date').value;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.getTime() > endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    let startValue = this.validateForm.get('start_date').value;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.getTime() <= startValue.getTime();
  };

  get_advertiser() {
    this.serverService.ads__advertiser_list({}).subscribe(res => {
      if (res.status === 200) {
        this.advertiserOption = res['result'];
        this.advertiserOption.forEach(item => {
          this.advertiserObj[item.id] = item.name;
        })
      }
    })
  }

  get_adposition() {
    this.serverService.ads__ad_position_list().subscribe(res => {
      if (res['status'] === 200) {
        this.positionOption = res['result'];
        this.positionOption.forEach(item => {
          this.positionObj[item.id] = item.name;
        })
      }
    })
  }

  make_sure() {
    if (!this.img_path) {
      this.nzMessageService.warning('没有添加广告图片');
      return;
    }
    let flag = false;
    for (const i in this.validateForm.controls) {
      let control = this.validateForm.controls[i];
      control.markAsDirty();
      control.updateValueAndValidity();
      if (control.errors && control.errors['required']) {
        if (!control.value) flag = true;
      }
    }
    if (flag) return;
    let start_date = this.validateForm.get('start_date').value,
      end_date = this.validateForm.get('end_date').value,
      position_id = this.validateForm.get('position_id').value,
      url_id = this.validateForm.get('url_id').value,
      price = this.validateForm.get('price').value,
      buy_click_num = this.validateForm.get('buy_click_num').value,
      buy_reach_num = this.validateForm.get('buy_reach_num').value;
    start_date = formatDate(start_date, 'yyyy-MM-dd', 'zh-Hans');
    end_date = end_date ? formatDate(end_date, 'yyyy-MM-dd', 'zh-Hans') : '';
    let position: any = this.positionObj[position_id];
    if (position.terminal_id === 2) {
      if (!url_id) {
        this.nzMessageService.warning('请输入广告跳转AppId！');
        return;
      };
    }
    let params = {
      position_id,
      advertiser_id: this.validateForm.get('advertiser_id').value,
      billing_method: this.validateForm.get('billing_method').value,

      image: this.img_path,
      name: this.validateForm.get('name').value,

      url_name: this.validateForm.get('url_name').value,
      url_type: this.validateForm.get('url_type').value,
      url_path: this.validateForm.get('url_path').value,
      start_date,
      sort: this.validateForm.get('sort').value,
      price: Number((price * 100).toFixed(0))
    }
    if (url_id) params['url_id'] = url_id;
    if (end_date) params['end_date'] = end_date;
    if (buy_click_num) params['buy_click_num'] = buy_click_num;
    if (buy_reach_num) params['buy_reach_num'] = buy_reach_num;
    if (this.id) params['id'] = this.id;
    this.loading = true;
    this.serverService.ads__edit_ads(params).subscribe(res => {
      this.loading = false;
      this.nzMessageService.success(this.id ? '编辑广告成功！' : '添加广告成功！');
      this.nzModelRef.destroy(true);
    }, err => {
      this.loading = false;
    })
  }

  make_cancel() {
    this.nzModelRef.destroy(false);
  }
}
