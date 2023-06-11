import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  public title: string = 'Dashboard';
  public email: string = '';
  public isExpanded: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    this.email = JSON.parse(localStorage.getItem('currentUser') ?? '{}').email;

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateTitle(event.urlAfterRedirects);
    });
  }

  ngOnInit(): void {
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  isUserAuthenticated() {

    const token: string | null = this.authService.getAccessTokenFromStorage();
    if (token) {
      return true;
    }
    else {
      return false;
    }
  }

  updateTitle(url: string) {
    // Update title based on the current route
    if (url === '/dashboard') {
      this.title = 'Dashboard';
    } else if (url.indexOf('/document-details') >= 0) {
      this.title = 'Document Details';
    } else if (url.indexOf('/upload-document') >= 0) {
      this.title = 'Upload Document';
    } else {
      this.title = 'Dashboard';
    }
  }

  public logOut = () => {
    this.authService.logout();
    this.router.navigate(["login"]);
  }
}