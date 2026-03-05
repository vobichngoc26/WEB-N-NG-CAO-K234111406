import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCookie();
  }

  login() {
    this.http.post<any>('http://localhost:3002/auth/login', {
      username: this.username,
      password: this.password
    }, { withCredentials: true })
    .subscribe({
      next: (res) => {
        this.message = "Login successful. Cookies have been created.";
        this.loadCookie(); // load lại cookie sau khi login
      },
      error: (err) => {
        this.message = err.error?.message || "Login failed";
      }
    });
  }

  loadCookie() {
    this.http.get<any>('http://localhost:3002/read-cookie',
      { withCredentials: true })
      .subscribe(data => {
        if (data.username) {
          this.username = data.username;
          this.password = data.password;
        }
      });
  }
}
