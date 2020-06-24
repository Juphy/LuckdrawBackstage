import { NgModule } from '@angular/core';
import { SharedModule } from "@shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { GoodsComponent } from './goods/goods.component';
import { ActivityComponent } from './activity/activity.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { DetailComponent } from './detail/detail.component';
import { CashComponent } from './cash/cash.component';

const routes: Routes = [
  { path: 'goods', component: GoodsComponent },
  { path: 'activity', component: ActivityComponent },
  { path: 'exchange', component: ExchangeComponent },
  { path: 'cash', component: CashComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GoodsComponent, ActivityComponent, ExchangeComponent, DetailComponent, CashComponent],
  entryComponents: [DetailComponent]
})
export class OrderModule { }
