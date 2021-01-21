import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddProjectComponent } from "./components/add-project/add-project.component";
import { EditProjectComponent } from "./components/edit-project/edit-project.component";
import { ProjectComponent } from "./project.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "~app/utils/shared.module";
import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";

@NgModule({
  declarations: [
    AddProjectComponent,
    EditProjectComponent,
    ProjectComponent,
    DynamicFormComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: "", component: ProjectComponent, pathMatch: "full" },
      { path: "add-project", component: AddProjectComponent },
      { path: "edit-project/:id/:divisionId", component: EditProjectComponent },
    ]),
    SharedModule,
  ],
})
export class ProjectModule {}
