import { Component, ChangeDetectorRef, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";

import { AuthService } from "~services/auth.service";
import { ProjectDataService } from "~services/project-data.service";

/**
 * Project data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface ProjectNode {
  name: string;
  id: number;
  type: string;
  children?: ProjectNode[];
}

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
})
export class ProjectComponent implements OnInit {
  public userId: number;
  public departmentId: number;
  public treeControl = new NestedTreeControl<ProjectNode>(
    (node) => node.children
  );
  public dataSource = new MatTreeNestedDataSource<ProjectNode>();
  public isLoading = false;
  public child: boolean;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private projectDataService: ProjectDataService,
    private router: Router,
    public dialog: MatDialog,
    public snack: MatSnackBar
  ) {}

  hasChild = (_: number, node: ProjectNode) => true;

  ngOnInit(): void {
    // this.dataSource.data = this.treeConstruct(TREE_DATA);
    if (!this.authService.loggedIn.getValue()) {
      this.router.navigate(["/login"]);
    }
    this.userId = JSON.parse(sessionStorage.getItem("user_id"));
    this.departmentId = JSON.parse(sessionStorage.getItem("department_id"));
  }

  ngAfterViewInit() {
    this.getData();
  }
  showChildren(node) {
    this.child = node.type === "child" ? true : false;
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  public getData(): void {
    this.isLoading = true;
    this.projectDataService.$getByUserId(this.userId).subscribe(
      (projectData) => {
        this.isLoading = false;
        const division = [];
        projectData.map((d) => {
          division.push({
            name: d.division_name,
            id: d.division_id,
            type: "child",
          });
        });
        const [department] = projectData;
        const treeData = [];
        treeData.push({
          name: department.department_name,
          id: this.departmentId,
          type: "parent",
          children: division,
        });
        this.dataSource.data = treeData;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}
