import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Customerdetail } from './customerdetail/customerdetail';
import { Listcustomerba } from './listcustomerba/listcustomerba';
import {HttpClientModule} from '@angular/common/http';
import { Exercise14 } from './exercise14/exercise14';
@NgModule({
  declarations: [
    App,
    Customerdetail,
    Listcustomerba,
    Exercise14,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule 
  ],
  bootstrap: [App]
})
export class AppModule { }
