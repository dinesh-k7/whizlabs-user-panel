import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

import { AuthService } from "~services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public isLogin = false;
  public isLoginError: boolean;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public snack: MatSnackBar
  ) {}

  ngOnInit() {
    if (sessionStorage.getItem("token")) {
      this.router.navigate(["/"]);
    }

    this.initLoginForm();
  }

  private initLoginForm(): void {
    this.form = this.fb.group({
      username: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      password: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  public isFieldInvalid(field: string) {
    if (this.form.get(field).touched) {
      return !this.form.get(field).valid;
    }
  }

  public login() {
    if (this.form.valid) {
      this.isLogin = true;
      this.authService.login(this.form.value).subscribe(
        (data: any) => {
          this.isLogin = false;

          if (data.success) {
            this.authService.loggedIn.next(true);
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("user_id", data.user_id);
            sessionStorage.setItem("department_id", data.department_id);
            this.router.navigate(["/"]);
          }
        },
        () => {
          this.isLogin = false;
          this.isLoginError = true;
        }
      );
    }
  }
}
