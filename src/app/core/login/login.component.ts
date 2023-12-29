import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { filter, mergeMap, takeUntil, toArray } from "rxjs/operators";
import { Subject, tap } from "rxjs";

import { NewAccountComponent } from "./new-account/new-account.component";
import { SweetAlertService } from "src/libs/services/sweet-alert.service";
import { LoginService, User } from "./login.service";

@Component({
  selector: "app-cfp-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly _COMPONENT_DESTROY$ = new Subject<any>();

  hidePassword = true;
	form: FormGroup = this._formBuilder.group({
    id: null,
    username: [null, Validators.required],
    password: [null, [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog,
    private _loginService: LoginService,
    private sweetAlertService: SweetAlertService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
  }

  ngOnDestroy(): void {
    this._COMPONENT_DESTROY$.complete();
  }

  getFormControl(field: string): FormControl {
		return this.form.controls[field] as FormControl;
	}

  login(): void  {
    if (this.form.invalid) return;
    const FORM = this.form.getRawValue() as User;
    this._loginService.getAll().pipe(
      takeUntil(this._COMPONENT_DESTROY$),
      mergeMap((response: any) => response),
      filter((response: any) => {
        if (response.username === FORM.username && response.password === FORM.password) {
          return response;
        }
        return null;
      }),
      toArray(),
      tap((response: User[]) => {
        if (response.length > 0) {
          localStorage.setItem('token', JSON.stringify(response[0]));
          this.router.navigate(["/home"]);
          return;
        }
        this.sweetAlertService.error('User not found.');
      })
    ).subscribe();
  }

  openDialog(): void {
    const DIALOG_REF = this._dialog.open(NewAccountComponent, {
      width: '500px',
      height: '410px'
    });

    DIALOG_REF.afterClosed()
      .pipe(
        takeUntil(this._COMPONENT_DESTROY$)
      ).subscribe();
  }
}
