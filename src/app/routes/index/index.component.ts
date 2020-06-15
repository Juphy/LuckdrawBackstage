import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserInfo, URL, URLS } from '@core';
import { Router } from "@angular/router";
import Swiper from 'swiper';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit {
  isLogin = false;
  userName = '孔明';
  path = '';
  headimgurl = '';
  banners = [
    { name: '1', url: 'assets/banner1.jpg' },
    { name: '2', url: 'assets/banner1.jpg' },
    { name: '3', url: 'assets/banner1.jpg' }
  ];
  swiper: Swiper;
  boxs = [
    { name: '食品包装', url: 'assets/img1.jpg', href: 'javascript:;' },
    { name: '食品包装', url: 'assets/img2.jpg', href: 'javascript:;' },
    { name: '食品包装', url: 'assets/img3.jpg', href: 'javascript:;' },
    { name: '食品包装', url: 'assets/img4.jpg', href: 'javascript:;' }
  ];
  descs = [
    { src1: 'assets/img11.jpg', h3: '优秀包装设计美学', p: '本公司专门为您打造定制的商品包装。本公司专门为您打造定制的商品包装。', url: '', src2: 'assets/img12.jpg' },
    { src1: 'assets/img21.jpg', h3: '上等材质制作包装', p: '本公司专门为您打造定制的商品包装。本公司专门为您打造定制的商品包装。', url: '', src2: 'assets/img22.jpg' },
    { src1: 'assets/img31.jpg', h3: '高级设备流水制作', p: '本公司专门为您打造定制的商品包装。本公司专门为您打造定制的商品包装。', url: '', src2: 'assets/img32.jpg' }
  ];

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
    console.log(UserInfo);
    if (UserInfo.id && UserInfo.name) {
      this.isLogin = true;
      this.userName = UserInfo.name;
      this.headimgurl = UserInfo.headimgurl;
      console.log(this.headimgurl);
      let a = UserInfo['permission'].find(item => item.type == 1);
      let b = UserInfo['permission'].find(item => item.pid == a.id);
      this.path = b ? URLS[b['display_name']] : URL[a['display_name']];
    }
  }

  ngAfterViewInit() {
    this.swiper = new Swiper('.swiper-container', {
      effect: 'slide',
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
    })
  }

  logout() {
    localStorage.clear();
    UserInfo['name'] = '';
    UserInfo['id'] = '';
    UserInfo['headimgurl'] = '';
    UserInfo['permission'] = [];
  }

}
