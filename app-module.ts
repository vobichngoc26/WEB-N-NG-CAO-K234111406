import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';

import { App } from './app';
import { About } from './about/about';
import { Notfound } from './notfound/notfound';
import { Listproduct } from './listproduct/listproduct';
import { Productdetail } from './productdetail/productdetail';
import { ServiceProductImageEvent } from './service-product-image-event/service-product-image-event';
import { ProductService } from './product-service';
import { ProductComponent } from './product-component/product-component';
import { Listcustomers } from './listcustomers/listcustomers';
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
import { Ex50Detail } from './ex50-detail/ex50-detail';
import { Ex50 } from './ex50/ex50';
import { Ex50newbook } from './ex50newbook/ex50newbook';
import { Ex50Edit } from './ex50-edit/ex50-edit';

@NgModule({
  declarations: 
  [ App, 
    About, 
    Notfound, 
    Listproduct, 
    Productdetail, 
    ServiceProductImageEvent, 
    ProductComponent, 
    Listcustomers, 
    FakeProductComponent, 
    FakeProduct2, 
    Ticker, 
    BooksComponent, 
    LoginComponent, 
    CourseRegistration, 
    Mathcomponent, 
    BookDetail, 
    FileUpload, 
    NewBook, 
    Ex50, 
    Ex50Detail, Ex50newbook, Ex50Edit],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [App]
})
export class AppModule {}