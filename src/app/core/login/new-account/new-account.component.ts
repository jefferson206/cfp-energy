
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { take, tap } from "rxjs";

import { SweetAlertService } from "src/libs/services/sweet-alert.service";
import { LoginService } from "../login.service";

@Component({
  selector: "app-cfp-new-account",
  templateUrl: "./new-account.component.html",
})
export class NewAccountComponent {
  hidePassword = true;

	form: FormGroup = this.formBuilder.group({
    id: null,
    username: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    isAdmin: false,
  });

  constructor(
    public dialogRef: MatDialogRef<NewAccountComponent>,
    private formBuilder: FormBuilder,
    private _loginService: LoginService,
    private sweetAlertService: SweetAlertService,
    private router: Router
  ) { }

  closeDialog() {
    this.dialogRef.close();
  }

  getFormControl(field: string): FormControl {
		return this.form.controls[field] as FormControl;
	}

  createAccount() {
    if (this.form.invalid) return;
    this._loginService.created(this.form.getRawValue())
      .pipe(
        take(1),
        tap((response: any) => {
          if(response.id !== null) {
            this.sweetAlertService.success('User created!').then(() => {
              localStorage.setItem('token', JSON.stringify(response));
              this.closeDialog();
              this.router.navigate(["/home"]);
            });
            return;
          }
          this.sweetAlertService.error('Something went wrong.');
        })
    ).subscribe();
  }
}
