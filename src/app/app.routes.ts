import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// FILTER
import { AuthGuard } from "~guards/auth.guard";

// LAYOUTS

import { LoginLayoutComponent } from "~modules/login-layout/login-layout.component";
import { ProjectComponent } from "~modules/project/project.component";
import { NotFoundComponent } from "~utils/index.pages";
import { UserLayoutComponent } from "~modules/user-layout/user-layout.component";
import { ProjectModule } from "~modules/project/project.module";

// ROUTES
const routes: Routes = [
  {
    path: "",
    component: UserLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: "./modules/project/project.module#ProjectModule",
      },
    ],
  },
  {
    path: "",
    component: LoginLayoutComponent,
    children: [
      {
        path: "login",
        loadChildren: "~modules/login-layout/login/login.module#LoginModule",
      },
      { path: "404", component: NotFoundComponent },
      { path: "**", redirectTo: "/404" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
