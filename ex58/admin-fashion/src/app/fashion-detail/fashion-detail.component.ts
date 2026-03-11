import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-fashion-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CKEditorModule],
  templateUrl: './fashion-detail.component.html',
  styleUrl: './fashion-detail.component.css'
})
export class FashionDetailComponent implements OnInit {
  id: string | null = null;
  title = '';
  details = '';
  thumbnail = '';
  style = '';
  loading = false;
  isEdit = false;
  viewMode = false; // true = view only (innerHTML), false = form with CKEditor
  creationDate = '';

  Editor = ClassicEditor as any;
  styles = ['Street Style', 'Trends', 'Classic'];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.id = p['id'] || null;
      this.isEdit = this.id !== null && this.id !== 'new';
      this.viewMode = this.id !== null && this.id !== 'new';
    });
    this.route.queryParams.subscribe(q => {
      if (q['edit'] === 'true') this.viewMode = false;
    });
    if (this.id && this.id !== 'new') this.load();
  }

  load(): void {
    if (!this.id) return;
    this.http.get<any>(`/api/fashions/${this.id}`).subscribe({
      next: (f) => {
        this.title = f.title || '';
        this.details = f.details || '';
        this.thumbnail = f.thumbnail || '';
        this.style = f.style || '';
        this.creationDate = f.creationDate ? new Date(f.creationDate).toLocaleDateString() : '';
      },
      error: () => alert('Load failed')
    });
  }

  save(): void {
    if (!this.title.trim()) {
      alert('Title is required');
      return;
    }
    if (!this.style.trim()) {
      alert('Style is required');
      return;
    }
    this.loading = true;
    const body = { title: this.title, details: this.details, thumbnail: this.thumbnail, style: this.style };
    const req = this.isEdit
      ? this.http.put(`/api/fashions/${this.id}`, body)
      : this.http.post('/api/fashions', body);
    req.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/fashions']);
      },
      error: () => {
        this.loading = false;
        alert('Save failed');
      }
    });
  }
}
