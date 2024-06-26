import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from '../storage/storage.service';
import { UserService } from '../user/user.service';
import { User } from '../../common/types';
//
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(
    this.storageService.isLoggedIn()
  );
  private apiUrl = environment.apiUrl;
  private loggedInUserSubject = new BehaviorSubject<User | null>(null);
  /**
   * Observable to get the logged in user, this is used to update the user data, is not from the storage or from API, it is indirectly from any of them
   */
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private userService: UserService
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
    const userId = this.storageService.getUser()?.id;
    if (!userId) {
      return null;
    }
    return this.userService.getUserByUserId(userId);
  }

  /**
   * This updates the logged in user data
   * @param data
   * @returns
   */
  updateLoggedInUser(user: User) {
    const oldUser = this.storageService.getUser();
    const newUser = { ...oldUser, ...user };

    this.storageService.updateUser(newUser);
    this.loggedInUserSubject.next(newUser);
  }

  /**
   * This is not from the API, it is from the storage, it should bring the same as the getLoggedInUser, but the difference is that the getLoggedInUser is from the API and could have more updated data
   * @returns
   */
  getLoggedInUserFromStorage() {
    return this.storageService.getUser();
  }

  private googleAuthUrl = `${this.apiUrl}/auth/google`;
  loginWithGoogle() {
    window.location.href = this.googleAuthUrl;
    // return this.http.get(`${this.apiUrl}/auth/google`);
  }

  /**
   * This is to validate the user and store it in the local storage, it does it by calling the backend API passi`ng the token and getting the decoded user data from the token and storing it in the local storage
   * @returns
   */
  validateAndStoreUser() {
    return this.http.get(`${this.apiUrl}/auth/me`).pipe(
      tap((response: any) => {
        const data = response.data;
        if (data?.username) {
          // save the user in the local storage
          this.storageService.saveUser(data);
          this.updateLoggedInUser(data);
          this.setIsLoggedIn(true);
        }
      }),
      catchError((error) => {
        throw error;
      })
    );
  }
}
