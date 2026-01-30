import { Component } from '@angular/core';
import { ProductService } from '../product-service';
import { Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-service-product-image-event-detail',
  standalone: false,
  templateUrl: './service-product-image-event-detail.html',
  styleUrl: './service-product-image-event-detail.css',
})
export class ServiceProductImageEventDetail {
selectedProduct:any
constructor(private activateRoute:ActivatedRoute,private _fs:ProductService,
private router:Router)
{
activateRoute.paramMap.subscribe(
(param)=>{
let ProductId=param.get('ProductId')
if(ProductId!=null)
{
this.selectedProduct=_fs.getProductDetail(ProductId)
}
}
)
}
goBack(){
this.router.navigate(['service-product-image-event'])
}
}
