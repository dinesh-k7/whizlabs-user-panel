import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { CONSTANT } from "~app/utils/constant";

import { Response } from "~app/models/response";

import { Provider } from "~base/provider";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { IUser } from "~models/user";

@Injectable()
export class UserService {
  loading = true;

  constructor(private http: HttpClient) {}

  public $getUser(id: number): Observable<any> {
    return this.http.get<Response>(
      CONSTANT.routes.user.get.replace(":id", String(id))
    );
  }

  public $getDivision(id: number): Observable<any> {
    return this.http.get<Response>(
      CONSTANT.routes.user.get_division.replace(":id", String(id))
    );
  }
}
