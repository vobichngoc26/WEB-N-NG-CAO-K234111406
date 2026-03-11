import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface Fashion {
  _id: string;
  title: string;
  details: string;
  thumbnail: string;
  style: string;
  creationDate?: string;
}

@Component({
  selector: 'app-fashion-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './fashion-list.component.html',
  styleUrl: './fashion-list.component.css'
})
export class FashionListComponent implements OnInit {
  fashions: Fashion[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.http.get<Fashion[]>('/api/fashions').subscribe({
      next: (list) => {
        this.fashions = list || [];
        this.loading = false;
      },
      error: () => {
        this.fashions = [];
        this.loading = false;
      }
    });
  }

  delete(id: string, title: string): void {
    if (!confirm(`Delete "${title}"?`)) return;
    this.http.delete(`/api/fashions/${id}`).subscribe({
      next: () => this.load(),
      error: () => alert('Delete failed')
    });
  }
}
