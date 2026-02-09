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
import { FakeProductComponent } from './fake-product-component/fake-product-component';
import { FakeProduct2 } from './fake-product2/fake-product2';
import { Ticker } from './ticker/ticker';
import { BooksComponent } from './books-component/books-component';
import { LoginComponent } from './login-component/login-component';
import { CourseRegistration } from './course-registration/course-registration';
import { Mathcomponent } from './mathcomponent/mathcomponent';
import { BookDetail } from './book-detail/book-detail';
import { FileUpload } from './file-upload/file-upload';
import { NewBook } from './new-book/new-book';
import { Ex50 } from './ex50/ex50';
import { Ex50Detail } from './ex50-detail/ex50-detail';
import { Ex50newbook } from './ex50newbook/ex50newbook';
import { Ex50Edit } from './ex50-edit/ex50-edit';

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
  {path:'ex21', component: LoginComponent},
  {path:'ex22', component: CourseRegistration},
  {path:'ex24', component: Mathcomponent},
  {path:'ex26', component: FakeProductComponent},
  {path:'ex27', component: FakeProduct2},
  {path:'ex28', component: Ticker},
  {path:'ex39', component: BooksComponent},
  {path:'ex41', component: BookDetail},
  {path:'ex41/:id', component: BookDetail},
  {path:'ex43', component: NewBook},
  {path:'ex49', component: FileUpload},
  {path:'ex50', component: Ex50},
  {path: 'ex50/:id', component: Ex50Detail },
  { path: 'new-book', component: Ex50newbook },
{ path: 'edit-book/:id', component: Ex50Edit},
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
