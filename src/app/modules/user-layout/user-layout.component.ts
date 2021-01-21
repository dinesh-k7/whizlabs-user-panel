import {
  Component,
  OnInit,
  NgZone,
  ElementRef,
  ViewChild,
  Renderer2,
} from "@angular/core";
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from "@angular/router";
import { MediaMatcher } from "@angular/cdk/layout";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";

import { AuthService } from "~services/auth.service";
import { ConfirmComponent } from "~components/confirm/confirm.component";

@Component({
  selector: "app-user-layout",
  templateUrl: "./user-layout.component.html",
  styleUrls: ["./user-layout.component.scss"],
  providers: [AuthService],
})
export class UserLayoutComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  @ViewChild("progressBar", { static: false })
  progressBar: ElementRef;

  constructor(
    private authService: AuthService,

    media: MediaMatcher,
    public dialog: MatDialog,

    private router: Router,
    private ngZone: NgZone,
    private renderer: Renderer2
  ) {
    router.events.subscribe((event: RouterEvent) => {
      this._navigationInterceptor(event);
    });
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: "300px",
      data: {
        title: "Logout",
        message: "Close session?",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        setTimeout(() => {
          this.authService.loggedIn.next(false);
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user_id");
          sessionStorage.removeItem("department_id");
          this.router.navigate(["/login"]);
        }, 1000);
      }
    });
  }

  // PROGRESS BAR
  private _navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.ngZone.runOutsideAngular(() => {
        this.renderer.setStyle(this.progressBar.nativeElement, "opacity", "1");
      });
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => {
        this.hideProgressBar();
      }, 1000);
    }
    if (event instanceof NavigationCancel) {
      setTimeout(() => {
        this.hideProgressBar();
      }, 1000);
    }
    if (event instanceof NavigationError) {
      setTimeout(() => {
        this.hideProgressBar();
      }, 1000);
    }
  }

  private hideProgressBar(): void {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.setStyle(this.progressBar.nativeElement, "opacity", "0");
    });
  }
}
