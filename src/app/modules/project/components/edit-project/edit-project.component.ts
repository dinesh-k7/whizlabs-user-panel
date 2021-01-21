import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";

import { IFormData } from "~models/form-data";
import { Router, ActivatedRoute } from "@angular/router";

import { UserService } from "~services/user.service";
import { ProjectDataService } from "~services/project-data.service";
import { IDivision } from "~app/models/division";

@Component({
  selector: "app-edit-project",
  templateUrl: "./edit-project.component.html",
  styleUrls: ["./edit-project.component.scss"],
})
export class EditProjectComponent implements OnInit {
  editProjectForm: FormGroup;
  isLoading: boolean = false;
  userId: number;
  divisionList: IDivision[] = [];
  divisionFieldId: number[] = [];
  selectedDivisionId: number;
  isFormSubmitted: boolean;
  dynamicForm: FormGroup;
  formData: IFormData[] = [];
  projectId: number;
  projectData: any;
  divisionId: number;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private projectDataService: ProjectDataService
  ) {}

  ngOnInit() {
    this.projectId = +this.activateRoute.snapshot.paramMap.get("id");
    this.divisionId = +this.activateRoute.snapshot.paramMap.get("divisionId");
    this.userId = JSON.parse(sessionStorage.getItem("user_id"));
    this.projectDataService.isFormSubmitted.subscribe(
      (status) => (this.isFormSubmitted = status)
    );
    this.createForm();
    this.getDivisions();
    this.getDynamicForm(this.divisionId);
  }

  private getDivisions(): void {
    this.userService.$getDivision(this.userId).subscribe((data) => {
      this.divisionList = data;
    });
  }

  private getProjectDetail(id: number): void {
    this.isLoading = true;
    if (id) {
      this.projectDataService.$get(id).subscribe(
        (projectData) => {
          this.isLoading = false;
          const [project] = projectData;
          this.projectData = project;
          const [data] = JSON.parse(this.projectData.data);
          this.dynamicForm.setValue(data);
        },
        () => {
          this.isLoading = false;
        }
      );
    }
  }

  public createForm(): void {
    this.editProjectForm = this.formBuilder.group({
      division_id: [null, [Validators.required]],
    });
    this.editProjectForm.setValue({ division_id: this.divisionId });
  }

  public getDynamicForm(division_id: number): void {
    if (division_id) {
      this.selectedDivisionId = division_id;
      this.isLoading = true;
      this.projectDataService.$getFormField(this.userId, division_id).subscribe(
        (formField) => {
          this.isLoading = false;
          if (formField && formField.length) {
            const formGroup = {};
            formField.forEach((formControl) => {
              this.divisionFieldId.push(formControl.id);
              const controlName = formControl.name
                .toLowerCase()
                .replace(" ", "_");

              formGroup[controlName] = new FormControl("");
              this.formData.push({
                controlName: controlName,
                controlType: formControl.type,
                valueType: formControl.type,
                label: formControl.name,
                validators: {
                  required: true,
                },
              });
            });

            this.dynamicForm = new FormGroup(formGroup);
            this.getProjectDetail(this.projectId);
          }
        },
        () => {
          this.isLoading = false;
        }
      );
    }
  }

  public onDone(): void {
    this.router.navigate(["/"]);
  }
}
