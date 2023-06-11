import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { User } from '../../classes/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = 'api/users';  // URL to in-memory web API

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        map(users => {
          const user = users.find(u => u.email === email && u.password === password) || null;
          if (user) {
            // Create a JWT-like token and refresh token
            const token = this.generateToken(user);
            const refreshToken = this.generateRefreshToken(user);

            user.accessToken = token;
            user.refreshToken = refreshToken;
            localStorage.setItem('currentUser', JSON.stringify(user));

            return { ...user, token, refreshToken };
          } else {
            throw new Error('Invalid credentials');
          }
        })
      );
  }

  // Simulate generating a JWT-like token
  generateToken(user: any) {
    const tokenData = {
      sub: user.id,
      email: user.email,
      // You could add more data to be encoded in the token here
    };
    return CryptoJS.AES.encrypt(JSON.stringify(tokenData), 'SECRET_KEY').toString();
  }

  // Simulate generating a refresh token
  generateRefreshToken(user: any) {
    const refreshTokenData = {
      sub: user.id,
      // You could add more data to be encoded in the refresh token here
    };
    return CryptoJS.AES.encrypt(JSON.stringify(refreshTokenData), 'REFRESH_SECRET_KEY').toString();
  }

  // Decode a token or refresh token
  decodeToken(token: string) {
    const bytes = CryptoJS.AES.decrypt(token, 'SECRET_KEY');
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  getCurrentUserEmail(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    return currentUser?.email ?? '';
  }

  getAccessTokenFromStorage(): string | null {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '{}');

    let token: string | null = currentUser.accessToken;
    return token;
  }

  logout(): void {
    localStorage.removeItem("currentUser");
  }
}
