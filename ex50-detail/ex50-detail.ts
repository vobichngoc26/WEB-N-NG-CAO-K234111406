import { Component } from '@angular/core';
import { IBook } from '../myclasses/iBook';
import { BookApiService } from '../myservices/book-api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ex50-detail',
  standalone: false,
  templateUrl: './ex50-detail.html',
  styleUrl: './ex50-detail.css',
})
  export class Ex50Detail {
    book!: IBook;

    constructor(
      private route: ActivatedRoute,
      private bookService: BookApiService
    ) {}

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.bookService.getBook(id).subscribe((data: IBook) => {
        this.book = data;
      });
    }
}
