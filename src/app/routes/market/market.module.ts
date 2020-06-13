import { NgModule } from '@angular/core';
import { SharedModule } from "@shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { CouponComponent } from './coupon/coupon.component';
import { AddComponent } from './add/add.component';
import { DatePipe } from '@angular/common';
import { DailyComponent } from './daily/daily.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { MoneyComponent } from './money/money.component';

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
  declarations: [CouponComponent, AddComponent, DailyComponent, ExchangeComponent, MoneyComponent],
  // AddComponent 添加优惠券
  entryComponents: [AddComponent]
})
export class MarketModule { }
