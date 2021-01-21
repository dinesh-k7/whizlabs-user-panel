import {
  Component,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
  OnInit,
} from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { merge, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { AuthService } from "~services/auth.service";
import { ProjectDataService } from "~services/project-data.service";
import { ConfirmComponent } from "~components/confirm/confirm.component";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
})
export class ProjectComponent implements OnInit {
  public displayedColumns = [
    "id",
    "department_name",
    "division_name",
    "action",
  ];
  public pageSizeOptions = [5, 10, 20, 40, 100];
  public pageSize = 20;
  public dataSource: any = new MatTableDataSource();
  public pageEvent: PageEvent;
  public resultsLength = 0;
  public page = 1;
  public isLoading = false;
  public isTotalReached = false;
  public totalItems = 0;
  public search = "";
  public userId: number;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private projectDataService: ProjectDataService,
    private router: Router,
    public dialog: MatDialog,
    public snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!this.authService.loggedIn.getValue()) {
      this.router.navigate(["/login"]);
    }
    this.userId = JSON.parse(sessionStorage.getItem("user_id"));
  }

  ngAfterViewInit() {
    this.getData();
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  public onPaginateChange(event: any): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getData();
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.getData();
  }

  public getData(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.projectDataService.$getByUserId(
            this.sort.active,
            this.sort.direction,
            this.pageSize,
            this.page,
            this.search,
            this.userId
          );
        }),
        map((projectList) => {
          this.isLoading = false;
          this.isTotalReached = false;
          this.totalItems = projectList["length"];
          return projectList;
        }),
        catchError(() => {
          this.isLoading = false;
          this.isTotalReached = true;
          return observableOf([]);
        })
      )
      .subscribe((data) => (this.dataSource.data = data));
  }

  public editProject(projectId: number, divisionId: number): void {
    this.router.navigate([`/edit-project/${projectId}/${divisionId}`]);
  }

  public deleteProject(project_id: number): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: "400px",
      data: {
        title: "Delete record",
        message: "Are you sure you want to delete this Project Detail?",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.projectDataService.$delete(project_id).subscribe((data: any) => {
          this.paginator._changePageSize(this.paginator.pageSize);
        });
      }
    });
  }

  public addProject(): void {
    this.router.navigate(["/add-project"]);
  }
}
