import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [App, About, Notfound, Listproduct, Productdetail, ServiceProductImageEvent, ProductComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ProductService],
  bootstrap: [App]
})
export class AppModule {}