import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productsImage=[{"ProductId":"p1","name":"Coca","price":100,"image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3M-xR4PTf-oldWP8s2UWBCDxtZatNqXs1NA&s"},
          {"ProductId":"p2","name":"Pepsi","price":300,"image":"https://minhcaumart.vn//media/com_eshop/products/resized/8934588012228%201-500x500.webp"},
          {"ProductId":"p3","name":"Sting","price":200,"image":"https://product.hstatic.net/200000460455/product/sting_dau_sleek_lon__320ml__7ea37f02dff64103ae8121a3f9b193c0_master.jpg"},
]
constructor() { }
getProductsWithImages()
{
return this.productsImage
}
getProductDetail(id:any){
return this.productsImage.find(x=>x.ProductId==id)
}
}
