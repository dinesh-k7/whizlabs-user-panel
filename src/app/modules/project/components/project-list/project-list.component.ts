import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

import { AddProjectComponent } from "../add-project/add-project.component";
import { UserService } from "~services/user.service";
import { EditProjectComponent } from "../edit-project/edit-project.component";
import { ConfirmComponent } from "~app/components/confirm/confirm.component";
import { ProjectDataService } from "~services/project-data.service";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.scss"],
})
export class ProjectListComponent implements OnInit {
  @Input() divisionId: number;
  displayedColumns: string[];
  dataSource: any = [];
  columns: any = [];
  isLoading: boolean;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService,
    private projectDataService: ProjectDataService
  ) {}

  ngOnInit(): void {
    this.getDivisionField(this.divisionId);
  }

  getDivisionField(divisionId: number): void {
    this.isLoading = true;
    this.userService.$getDivisionField(divisionId).subscribe(
      (data) => {
        this.isLoading = false;
        const [source, fields] = data;
        if (fields && fields.length && source && source.length) {
          this.columns = fields.map((field) => {
            return {
              name: field.name,
              label: field.name.toLowerCase().split(" ").join("_"),
            };
          });

          this.dataSource = source.map((d) => {
            const [data] = JSON.parse(d.data);
            return { ...data, id: d.id };
          });

          this.displayedColumns = this.columns.map((column) => column.name);
          this.displayedColumns.push("id");
        } else {
          this.dataSource = [];
        }
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  addProject(): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: "600px",
      data: {
        action: "add",
        title: "Add Project Detail",
        division_id: this.divisionId,
      },
    });

    dialogRef.afterClosed().subscribe((id) => {
      if (id) {
        this.getDivisionField(id);
      }
    });
  }

  editProject(id: number): void {
    const dialogRef = this.dialog.open(EditProjectComponent, {
      width: "600px",
      data: {
        action: "add",
        title: "Edit Project Detail",
        division_id: this.divisionId,
        project_id: id,
      },
    });

    dialogRef.afterClosed().subscribe((id) => {
      if (id) {
        this.getDivisionField(id);
      }
    });
  }

  public deleteProject(id: number): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: "400px",
      data: {
        title: "Delete record",
        message: "Are you sure you want to delete this Project Detail?",
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      if (id) {
        this.projectDataService.$delete(id).subscribe((data) => {
          this.getDivisionField(this.divisionId);
        });
      }
    });
  }
}
