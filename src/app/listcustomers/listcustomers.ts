import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer-service';
@Component({
  selector: 'app-listcustomers',
  standalone: false,
  templateUrl: './listcustomers.html',
  styleUrl: './listcustomers.css',
})
export class Listcustomers implements OnInit{
customerGroups: any[] = [];

  constructor(private service: CustomerService) {}

  ngOnInit(): void {
    this.service.getCustomers().subscribe(data => {this.customerGroups = data;});
  }
}
