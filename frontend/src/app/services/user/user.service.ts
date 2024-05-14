import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userApi = `${environment.apiUrl}/users`
  constructor(private http: HttpClient) {}
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  getPublicContent(): Observable<string> {
    return of('Public content');
  }

  getAdminBoard(): Observable<string> {
    return of('Admin content');
  }

  updateUserData(data: any, userId: number): Observable<any> {
    return this.http.put(`${this.userApi}/${userId}`, data);
  }

  getUserByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.userApi}/${userId}`);
  }

  setUser(user: any) {
    this.userSubject.next(user);
  }
}
