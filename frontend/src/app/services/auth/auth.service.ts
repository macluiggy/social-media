import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from '../storage/storage.service';
import { UserService } from '../user/user.service';
import { User } from '../../common/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private apiUrl = environment.apiUrl;
  private loggedInUserSubject = new BehaviorSubject<User | null>(null);
  /**
   * Observable to get the logged in user, this is used to update the user data, is not from the storage or from API, it is indirectly from any of them
   */
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private userService: UserService,
  ) {}

  signUp(credentials: any) {
    return this.http.post(`${this.apiUrl}/auth/signup`, credentials);
  }

  signIn(credentials: any) {
    return this.http.post(`${this.apiUrl}/auth/signin`, credentials).pipe(
      tap((response: any) => {
        const data = response.data;
        this.storageService.saveUser(data.user);
        this.updateLoggedInUser(data.user);
        this.storageService.setToken(data.accessToken);
        this.setIsLoggedIn(true);
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  logout() {
    return this.http.post(`${this.apiUrl}/auth/logout`, {}).pipe(
      tap(() => {
        this.setIsLoggedIn(false);
        this.storageService.clean();
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  setIsLoggedIn(value: boolean) {
    this.isLoggedIn.next(value);
  }

  userIsLoggedIn() {
    return this.storageService.isLoggedIn();
  }

  /**
   * This gets the logged in user from backend API
   * @returns
   */
  getLoggedInUser() {
    const userId = this.storageService.getUser().id;
    return this.userService.getUserByUserId(userId);
  }

  /**
   * This updates the logged in user data, not in the storage, but in the app, it is only in the state of the angular app
   * @param data
   * @returns
   */
  updateLoggedInUser(user: User) {
    const previousUser = this.storageService.getUser();
    const newUser = { ...previousUser, ...user };
    this.storageService.saveUser(newUser);
    this.loggedInUserSubject.next(user);
  }
}
