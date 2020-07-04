import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ServerService, Options } from '@core';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadFile } from 'ng-zorro-antd/upload';
import { HttpClient } from '@angular/common/http';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styles: [
    `img {
      display: block;
      max-width: 100%;
    }`
  ]
})
export class AddImageComponent implements OnInit {
  loading = false;
  fileList: UploadFile[] = [];
  validateForm: FormGroup;
  typesOption = [];
  img_path = '';

  cropper: any;
  visible = false;
  okLoading = false;
  imageUrl: any = '/assets/images/body.jpg';
  constructor(
    private serverService: ServerService,
    private nzMessageService: NzMessageService,
    private nzModelRef: NzModalRef,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.typesOption = [...Options.online_gallery];
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      types: [null, [Validators.required]]
    })
  }

  make_sure() {
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
    if (!this.img_path) {
      this.nzMessageService.error('没有上传图片！')
      return;
    }
    let params = {
      name: this.validateForm.get('name').value,
      types: this.validateForm.get('types').value,
      img_path: this.img_path,
      show: 1
    }
    this.loading = true;
    this.serverService.manager__edit_online_gallery(params).subscribe(res => {
      this.loading = false;
      this.nzMessageService.success('新增图片成功！');
      this.nzModelRef.destroy(true);
    })
  }

  make_cancel() {
    this.nzModelRef.destroy(false);
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.visible = true;
    setTimeout(() => {
      const image: any = document.getElementById('image');
      console.log(image);
      if (file) {
        image['src'] = URL.createObjectURL(file);
      }
      if (this.cropper) this.cropper.destroy();
      this.cropper = new Cropper(image, {
        aspectRatio: 2 / 1,
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

}
