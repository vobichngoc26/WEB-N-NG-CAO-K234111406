import { Component } from '@angular/core';
import { BookApiService } from '../myservices/book-api';

@Component({
  selector: 'app-books-component',
  standalone: false,
  templateUrl: './books-component.html',
  styleUrl: './books-component.css',
})
export class BooksComponent {
books:any;
errMessage:string=''
constructor(private _service: BookApiService){
this._service.getBooks().subscribe({
next:(data)=>{this.books=data},
error:(err)=>{this.errMessage=err}
})
}
}
