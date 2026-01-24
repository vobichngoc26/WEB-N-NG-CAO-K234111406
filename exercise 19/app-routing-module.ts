import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { About } from './about/about';
import { Listcustomer2 } from './listcustomer2/listcustomer2';
import { Listcustomerba } from './listcustomerba/listcustomerba';
import { Listcustomer } from './listcustomer/listcustomer';
import { Listproduct } from './listproduct/listproduct';
import { Productdetail } from './productdetail/productdetail';
import { Notfound } from './notfound/notfound';
import { ServiceProductImageEventDetail } from './service-product-image-event-detail/service-product-image-event-detail';
import { ServiceProductImageEvent } from './service-product-image-event/service-product-image-event';
import { ProductComponent } from './product-component/product-component';

const routes: Routes = [
  { path: 'gioi-thieu', component: About },
  {path:"khach-hang-1",component: Listcustomer},
  {path:"khach-hang-2",component: Listcustomer2},
  {path:"khach-hang-3",component: Listcustomerba},
  {path:"san-pham-1",component: Listproduct},
  {path:"san-pham-1/:id",component: Productdetail},
  {path:'service-product-image-event', component:ServiceProductImageEvent},
  {path:'service-product-image-event/:ProductId',component:ServiceProductImageEventDetail},
  {path:'product',component:ProductComponent},
  {path:'service-product',component:ServiceProductImageEvent},
  {path:"**",component: Notfound},
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const RoutingComponent=[
ProductComponent,
Listproduct,
ServiceProductImageEvent,
]
