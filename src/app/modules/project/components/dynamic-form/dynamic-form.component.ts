import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

import { ProjectDataService } from "~services/project-data.service";

@Component({
  selector: "app-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.scss"],
})
export class DynamicFormComponent implements OnInit {
  @Input("formData") formData: any;
  @Input("dynamicForm") dynamicForm: any;
  @Input("divisionId") divisionId: number;
  @Input("divisionFieldId") divisionFieldId: number[];
  @Input("projectId") projectId: number;
  isLoading: boolean;
  constructor(
    private readonly projectDataService: ProjectDataService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submitForm(): void {
    if (this.dynamicForm.valid) {
      this.isLoading = true;
      const user_id = JSON.parse(sessionStorage.getItem("user_id"));
      const department_id = JSON.parse(sessionStorage.getItem("department_id"));
      const data = {
        user_id,
        department_id,
        division_id: this.divisionId,
        division_field_id:
          this.divisionFieldId && this.divisionFieldId.join(","),
        data: JSON.stringify([this.dynamicForm.value]),
      };
      if (this.projectId) {
        this.projectDataService.$update(data, this.projectId).subscribe(
          () => {
            this.isLoading = false;
          },
          () => {
            this.isLoading = false;
          }
        );
      } else {
        this.projectDataService.$save(data).subscribe(
          () => {
            this.isLoading = false;
            this.projectDataService.formSubmitted.next(true);
          },
          () => {
            this.isLoading = false;
          }
        );
      }
    }
  }

  public onCancel(): void {
    this.router.navigate(["/"]);
  }
}
