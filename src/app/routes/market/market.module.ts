import { NgModule } from '@angular/core';
import { SharedModule } from "@shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { CouponComponent } from './coupon/coupon.component';
import { AddCouponComponent } from './add-coupon/add-coupon.component';
import { DatePipe } from '@angular/common';
import { DailyComponent } from './daily/daily.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { MoneyComponent } from './money/money.component';
import { AddDailyComponent } from './add-daily/add-daily.component';

const routes: Routes = [
  { path: 'coupon', component: CouponComponent },
  { path: 'daily', component: DailyComponent },
  { path: 'exchange', component: ExchangeComponent },
  { path: 'money', component: MoneyComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [DatePipe],
  declarations: [CouponComponent, AddCouponComponent, DailyComponent, AddDailyComponent, ExchangeComponent, MoneyComponent],
  // AddCouponComponent 添加优惠券
  // AddDailyComponent 添加每日任务
  entryComponents: [AddCouponComponent, AddDailyComponent]
})
export class MarketModule { }
