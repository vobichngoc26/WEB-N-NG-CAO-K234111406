import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-fashion-detail-view',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './fashion-detail-view.component.html',
  styleUrl: './fashion-detail-view.component.css'
})
export class FashionDetailViewComponent implements OnInit {
  fashion: any = null;
  loading = true;
  safeDetails: SafeHtml = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      const id = p['id'];
      if (id) this.load(id);
    });
  }

  load(id: string): void {
    this.http.get<any>(`/api/fashions/${id}`).subscribe({
      next: (f) => {
        this.fashion = f;
        this.safeDetails = this.sanitizer.bypassSecurityTrustHtml(f.details || '');
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
