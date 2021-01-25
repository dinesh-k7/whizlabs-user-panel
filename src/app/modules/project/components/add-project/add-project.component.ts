import { Component, OnInit, Input, Inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

import { IUser, IDepartment } from "~models/user";
import { IFormData } from "~models/form-data";
import { UserService } from "~services/user.service";
import { ProjectDataService } from "~services/project-data.service";
import { IDivision } from "~app/models/division";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IModalForm } from "~app/models/dialog-data";

@Component({
  selector: "app-add-project",
  templateUrl: "./add-project.component.html",
  styleUrls: ["./add-project.component.scss"],
})
export class AddProjectComponent implements OnInit {
  @Input("divisionId") divisionId: number;
  addProjectForm: FormGroup;
  dynamicForm: FormGroup;
  user: IUser;
  department: IDepartment[];
  isLoading: boolean = false;
  formData: IFormData[] = [];
  userId: number;
  divisionList: IDivision[] = [];
  divisionFieldId: number[] = [];
  selectedDivisionId: number;
  isFormSubmitted: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IModalForm,
    private projectDataService: ProjectDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = JSON.parse(sessionStorage.getItem("user_id"));
    if (this.data) {
      const { division_id } = this.data;
      this.getFormField(division_id);
    }
  }

  public onSubmit(user: IUser) {}

  public onDone(): void {
    this.router.navigate(["/"]);
  }

  public getFormField(division_id: number): void {
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
                .split(" ")
                .join("_");

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
          }
        },
        () => {
          this.isLoading = false;
        }
      );
    }
  }

  public onClose(id: number) {
    this.dialogRef.close(id);
  }
}
