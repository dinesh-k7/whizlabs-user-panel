import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModule } from "~utils/shared.module";
import { UserLayoutComponent } from "./user-layout.component";

@NgModule({
  imports: [RouterModule, SharedModule],
  declarations: [UserLayoutComponent],
  providers: [],
  exports: [],
})
export class UserLayoutModule {}
