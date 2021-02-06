import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CONSTANT } from "~app/utils/constant";

import { Response } from "~app/models/response";

import { Observable } from "rxjs";

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

  public $getDivisionField(id: number): Observable<any> {
    return this.http.get<Response>(
      CONSTANT.routes.user.get_division_field.replace(":id", String(id))
    );
  }
}
