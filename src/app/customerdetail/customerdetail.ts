import { Component } from '@angular/core';
import { CustomerService } from '../customer-service';

@Component({
  selector: 'app-customerdetail',
  standalone: false,
  templateUrl: './customerdetail.html',
  styleUrl: './customerdetail.css',
})
export class Customerdetail {
  constructor(private cs:CustomerService)
  {}
  search_customer_by_id(
  id: string,
  tdid: HTMLElement,
  tdname: HTMLElement,
  tdage: HTMLElement
) {
  this.cs.get_customer_detail(id).subscribe((data: any[]) => {
    const c = data.find(x => x.Id === id);

    if (c) {
      tdid.innerHTML = c.Id;
      tdname.innerHTML = c.Name;
      tdage.innerHTML = "<font color='red'>" + c.Age + "</font>";
    } else {
      tdid.innerHTML = "";
      tdname.innerHTML = "";
      tdage.innerHTML = "";
    }
  });
}

}
