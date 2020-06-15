import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  // 传递信息
  private subject = new Subject<any>();
  message: any; // 仅用于传递信息

  sendMessage(message: any) {
    this.message = message;
    this.subject.next(message);
    this.subject.complete();
  }

  clearMessage() {
    this.message = null;
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return of(this.message);
  }

  // 传递信息
  // 使用方法：发送消息的组件中，transportMessage()；接收消息的组件的constructor中进行订阅，this.subscription=messageService.message$.subscribe(...)；ngOnDestory()中取消订阅，this.subscription.unsubscribe();
  private MessageSource = new Subject<string>(); // observable string source
  message$ = this.MessageSource.asObservable(); // observable string streams
  transportMessage(message: any) {
    this.MessageSource.next(message);
  }

  //以下用作储存当前组件的信息
  // 商品列表
  spuList: any;
  setSpuList(obj) {
    this.spuList = obj;
  }

  clearSpuList() {
    this.spuList = null;
  }

  getSpuList(): Observable<any> {
    return of(this.spuList);
  }

  // 优惠券列表
  couponList: any;
  setCouponList(obj) {
    this.couponList = obj;
  }

  clearCouponList() {
    this.couponList = null;
  }

  getCouponList(): Observable<any> {
    return of(this.couponList);
  }

  // 广告列表
  adList: any;
  setAdList(obj) {
    this.adList = obj;
  }

  clearAdList() {
    this.adList = null;
  }

  getAdList(): Observable<any> {
    return of(this.adList);
  }

  // 角色列表
  roleList: any;
  setRoleList(obj) {
    this.roleList = obj;
  }

  clearRoleList() {
    this.roleList = null;
  }

  getRoleList(): Observable<any> {
    return of(this.roleList);
  }

  // 模板列表
  templateList: any;
  setTemplateList(obj) {
    this.templateList = obj;
  }

  clearTemplateList() {
    this.templateList = null;
  }

  getTemplateList(): Observable<any> {
    return of(this.templateList);
  }
}
