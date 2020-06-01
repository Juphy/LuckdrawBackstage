import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ServerService } from '@core';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { UploadFile } from 'ng-zorro-antd/upload';
import { HttpClient } from '@angular/common/http';
import { Ad_Type, AdType, Url_Type, UrlType } from '@routes/DATA';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, AfterViewInit {
  validateForm: FormGroup;
  fileList = [];
  previewImage: string | undefined = '';
  previewVisible = false;
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  positionOption = [];
  positionObj = {};
  adTypeOption = [...Ad_Type];
  adTypeObj = { ...AdType };
  adUrlOption = [...Url_Type];
  adUrlObj = { ...UrlType };
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
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      // image
      position_id: [null, [Validators.required]],
      // position_type: [null, [Validators.required]],
      url_name: ['', [Validators.required]],
      url_type: [null, [Validators.required]],
      url_path: ['', [Validators.required]],
      url_id: [null, [Validators.required]],
      date: [null, [Validators.required]],
      sort: [0, [Validators.required]]
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
          this.validateForm.get('date').setValue([new Date(res['start_date']), new Date(res['end_date'])])
          this.fileList = [{
            uid: 1,
            name: '1',
            status: 'done',
            url: res.image
          }];
        }
      })
    }
  }

  // 预览图片
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  beforeUpload = (file, files): boolean => {
    let fileList = [...this.fileList];
    this.fileList = [...fileList, {
      uid: file.uid,
      name: file.name,
      status: 'uploading'
    }];
    let formData = new FormData();
    formData.append('img_path', file);
    this.http.post('ucs/upload_img', formData).subscribe(res => {
      if (res['status'] === 200) {
        this.fileList = [...fileList, {
          uid: file.uid,
          name: file.name,
          status: 'done',
          url: res['result']
        }]
      } else {
        this.fileList = [...fileList];
      }
    }, err => {
      this.fileList = [...fileList];
    })
    return false;
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
    if (!this.fileList.length) {
      this.nzMessageService.warning('没有添加广告图片')
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
    let start_date, end_date, date = this.validateForm.get('date').value;
    start_date = formatDate(date[0], 'yyyy-MM-dd', 'en-US');
    end_date = formatDate(date[1], 'yyyy-MM-dd', 'en-US');
    let params = {
      position_id: this.validateForm.get('position_id').value,
      image: this.fileList[0]['url'],
      name: this.validateForm.get('name').value,
      url_name: this.validateForm.get('url_name').value,
      start_date,
      end_date,
      sort: this.validateForm.get('sort').value,
      // position_type: this.validateForm.get('position_type').value,
      url_type: this.validateForm.get('url_type').value,
      url_path: this.validateForm.get('url_path').value,
      url_id: this.validateForm.get('url_id').value
    }
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
