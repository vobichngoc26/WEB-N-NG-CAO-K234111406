import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  datas = [
    {
      Cateid: 'cate1',
      CateName: 'nuoc ngot',
      Products: [
        { ProductId: 'p1', ProductName: 'Coca', Price: 100, Image: 'https://bizweb.dktcdn.net/thumb/grande/100/469/765/products/1503-9de8f3562b364e56b550ff30bc493122-2c0db7cc76fd4b7f8b3c767fb24bc277-d4f804d8fc474b4bae5f628ff0d632e0-master.jpg' },
        { ProductId: 'p2', ProductName: 'Pepsi', Price: 300, Image: 'https://cdn.tgdd.vn/Products/Images/2443/76467/bhx/nuoc-ngot-pepsi-cola-lon-320ml-202407131656260952.jpg' },
        { ProductId: 'p3', ProductName: 'Sting', Price: 200, Image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTrJ4vMnBP_wYaKEdIF6uUQZsu4AcVtdYaUA&s' }
      ]
    },
    {
      Cateid: 'cate2',
      CateName: 'Bia',
      Products: [
        { ProductId: 'p4', ProductName: 'Heleiken', Price: 500, Image: 'https://heineken-vietnam.com.vn/images/s/heineken.png' },
        { ProductId: 'p5', ProductName: '333', Price: 400, Image: 'https://www.cqmart.vn/images/thumbs/0002104_bia-333-lon-330ml.png' },
        { ProductId: 'p6', ProductName: 'Sai Gon', Price: 600, Image: 'https://cdn.tgdd.vn/Products/Images/2282/158346/bhx/bia-sai-gon-lager-330ml-202110111039276926.jpg' }
      ]
    }
  ];

  constructor() {}

  getCategories() {
    return this.datas;
  }
}
