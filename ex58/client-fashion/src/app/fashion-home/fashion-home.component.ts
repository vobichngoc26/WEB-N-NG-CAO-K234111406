import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

export interface Fashion {
  _id: string;
  title: string;
  details: string;
  thumbnail: string;
  style: string;
  creationDate?: string;
}

@Component({
  selector: 'app-fashion-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './fashion-home.component.html',
  styleUrl: './fashion-home.component.css'
})
export class FashionHomeComponent implements OnInit {
  fashions: Fashion[] = [];
  filtered: Fashion[] = [];
  styles: string[] = [];
  selectedStyle = '';
  searchText = '';
  loading = true;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.http.get<Fashion[]>('/api/fashions').subscribe({
      next: (list) => {
        this.fashions = list || [];
        this.styles = [...new Set(this.fashions.map(f => f.style))];
        this.applyFilter();
        this.loading = false;
      },
      error: () => {
        this.fashions = [];
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    let list = this.fashions;
    if (this.selectedStyle) {
      list = list.filter(f => f.style === this.selectedStyle);
    }
    if (this.searchText.trim()) {
      const t = this.searchText.toLowerCase();
      list = list.filter(f =>
        f.style.toLowerCase().includes(t) || f.title.toLowerCase().includes(t)
      );
    }
    this.filtered = list;
  }

  groupByStyle(): { style: string; items: Fashion[] }[] {
    const map = new Map<string, Fashion[]>();
    for (const f of this.filtered) {
      if (!map.has(f.style)) map.set(f.style, []);
      map.get(f.style)!.push(f);
    }
    return Array.from(map.entries()).map(([style, items]) => ({ style, items }));
  }
}
