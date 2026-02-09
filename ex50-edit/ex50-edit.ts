import { Component } from '@angular/core';
import { IBook } from '../myclasses/iBook';
import { BookApiService } from '../myservices/book-api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ex50-edit',
  standalone: false,
  templateUrl: './ex50-edit.html',
  styleUrl: './ex50-edit.css',
})
export class Ex50Edit {
book!: IBook;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.bookService.getBook(id).subscribe(data => {
      this.book = data;
    });
  }

  update() {
    this.bookService.putBook(this.book.BookId, this.book).subscribe(() => {
      this.router.navigate(['/ex50']);
    });
  }
}
