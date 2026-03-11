import { Routes } from '@angular/router';
import { FashionHomeComponent } from './fashion-home/fashion-home.component';
import { FashionDetailViewComponent } from './fashion-detail-view/fashion-detail-view.component';

export const routes: Routes = [
  { path: '', component: FashionHomeComponent },
  { path: 'fashion/:id', component: FashionDetailViewComponent }
];
