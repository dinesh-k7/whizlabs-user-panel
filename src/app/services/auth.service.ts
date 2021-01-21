import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";

import { IUserLogin } from "~models/user";
import { Response } from "~app/models/response";
import { CONSTANT } from "~app/utils/constant";

@Injectable()
export class AuthService {
  public loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(public http: HttpClient) {}

  headers = new HttpHeaders({
    "x-access-token": sessionStorage.getItem("token"),
  });

  login(user: IUserLogin): any {
    return this.http.post<Response>(CONSTANT.routes.authorization.login, user);
  }

  logout(): Observable<Response> {
    return this.http.get<Response>(CONSTANT.routes.authorization.logout, {
      headers: this.headers,
    });
  }

  hasToken(): boolean {
    return !!sessionStorage.getItem("token");
  }
}
