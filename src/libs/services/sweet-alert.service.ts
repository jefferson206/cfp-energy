import { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SweetAlertService {
  private _defaultOptions = {
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      reverseButtons: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#218838',
  };

  constructor() {}

  public success(msg: string, confirmBtnTxt: string = 'Ok', title: string = 'Success!') {
      return this.swalAlert({
          title: title,
          text: msg,
          icon: 'success',
          confirmButtonText: confirmBtnTxt,
      });
  }

  public successToDelete() {
      return this.success('The item has been deleted.', 'Ok', 'Deleted!');
  }

  public error(msg: string, title: string = 'Ooops!') {
      return this.swalAlert({
          title: title,
          text: msg,
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3085d6'
      });
  }

  public alert(title: string = 'Are you sure you want to save the changes?',
    confirmButtonText: string = 'Confirm') {
    return this.swalAlert({
      title: title,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      confirmButtonColor: '#218838',
    });
  }

  private swalAlert(options: SweetAlertOptions): Promise<SweetAlertResult<any>> {
    const OPTIONS = { ...this._defaultOptions, ...options };
    return Swal.fire(OPTIONS);
  }
}

