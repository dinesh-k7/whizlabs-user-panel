import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { CONSTANT } from "~app/utils/constant";

import { Response } from "~app/models/response";

import { Observable, BehaviorSubject } from "rxjs";

import { IProjectData } from "~models/project-data";

@Injectable()
export class ProjectDataService {
  constructor(private http: HttpClient) {}
  public formSubmitted = new BehaviorSubject<boolean>(false);

  get isFormSubmitted() {
    return this.formSubmitted.asObservable();
  }

  public $getList(
    sortActive: string,
    order: string,
    pageSize: number,
    page: number,
    search: string
  ): Observable<Response> {
    let params = new HttpParams();
    params = params.append("active", sortActive);
    params = params.append("order", order);
    params = params.append("search", search);
    params = params.append("pageSize", pageSize.toString());
    params = params.append("page", page.toString());

    return this.http.get<Response>(CONSTANT.routes.project_data.list, {
      params: params,
    });
  }

  public $delete(id: number): Observable<Response> {
    return this.http.delete<Response>(
      CONSTANT.routes.project_data.delete.replace(":id", String(id))
    );
  }

  public $get(id: number): Observable<any> {
    return this.http.get<Response>(
      CONSTANT.routes.project_data.get.replace(":id", String(id))
    );
  }

  public $getByUserId(
    // sortActive: string,
    // order: string,
    // pageSize: number,
    // page: number,
    // search: string,
    user_id: number
  ): Observable<any> {
    // let params = new HttpParams();
    // params = params.append("active", sortActive);
    // params = params.append("order", order);
    // params = params.append("search", search);
    // params = params.append("pageSize", pageSize.toString());
    // params = params.append("page", page.toString());
    return this.http.get<Response>(
      CONSTANT.routes.project_data.get_by_userid.replace(":id", String(user_id))
      // {
      //   params: params,
      // }
    );
  }

  public $save(projectData: IProjectData): Observable<Response> {
    return this.http.post<Response>(
      CONSTANT.routes.project_data.save,
      projectData
    );
  }

  public $update(projectData: IProjectData, id: number): Observable<Response> {
    return this.http.put<Response>(
      CONSTANT.routes.project_data.update.replace(":id", String(id)),
      projectData
    );
  }

  public $getFormField(user_id: number, division_id: number): Observable<any> {
    const url = CONSTANT.routes.project_data.get_form_field.replace(
      ":divisionId",
      String(division_id)
    );

    return this.http.get<Response>(url.replace(":userId", String(user_id)));
  }
}
