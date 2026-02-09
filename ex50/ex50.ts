import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBook } from '../myclasses/iBook';
import { BookApiService } from '../myservices/book-api';

@Component({
  selector: 'app-ex50',
  standalone: false,
  templateUrl: './ex50.html',
  styleUrls: ['./ex50.css']
})
export class Ex50 implements OnInit {

   books: IBook[] = [];

  constructor(
    private bookService: BookApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe((data: IBook[]) => {
      this.books = data;
    });
  }

  addBook() {
    this.router.navigate(['/new-book']);
  }

  viewDetail(book: IBook) {
    this.router.navigate(['/ex50', book.BookId]);
  }

  editBook(book: IBook) {
    this.router.navigate(['/edit-book', book.BookId]);
  }

  deleteBook(bookId: string) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(bookId).subscribe(() => {
        this.loadBooks();
      });
    }
  }
}
