import { Routes } from '@angular/router';
import { FashionListComponent } from './fashion-list/fashion-list.component';
import { FashionDetailComponent } from './fashion-detail/fashion-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'fashions', pathMatch: 'full' },
  { path: 'fashions', component: FashionListComponent },
  { path: 'fashions/new', component: FashionDetailComponent },
  { path: 'fashions/:id', component: FashionDetailComponent }
];
