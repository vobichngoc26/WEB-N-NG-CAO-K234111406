import { Component } from '@angular/core';
import { AuthenticationService } from '../myservices/authentication-service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
user = {
  username: '',
  password: ''
};
  constructor(private api: AuthenticationService) {}

register() {
  this.api.register(this.user).subscribe(res => {
    alert(res.message);
  });
}

}
