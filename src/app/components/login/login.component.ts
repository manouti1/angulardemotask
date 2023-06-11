import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../../classes/user';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;
  errorMessage: string | null = null;
  public invalidLogin: boolean = false;

  constructor(private authService: AuthService, private notification: NotificationService, private router: Router) { }

  ngOnInit(): void {
    // If the token exists in localStorage, navigate to the dashboard
    const accessToken = this.authService.getAccessTokenFromStorage();
    if (accessToken) {
      this.router.navigate(['/dashboard']);
    }
  }

  login(form: NgForm) {
    this.email = form.value.email;
    this.password = form.value.password;

    if (form.valid) {
      this.authService.login(this.email, this.password).subscribe(
        (user: any) => {
          if (user) {
            // Login successful
            this.notification.showSuccess("User login successful", "Success");

            this.invalidLogin = false;
            this.router.navigate(["/dashboard"]);
          } else {
            // Login failed
            this.notification.showError("Invalid username or password.", "Error")
            this.invalidLogin = true;
          }
        },
        (error: any) => {
          this.notification.showError("Something went wrong!", "Error");
          this.invalidLogin = true;
          console.error('Login error', error);
        }
      );
    }
  }

}
