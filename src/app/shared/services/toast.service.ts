import { Injectable } from '@angular/core';

import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private service: NbToastrService) { }

  public displayToast(title: string, message: string = '', status = 'danger', showMessage = false, position = 'top-right') {
    this.service.show(
      message,
      title,
      ({
        position: position,
        status: status,
        toastClass: showMessage || message ? '' : 'toast-without-message',
      } as any),
    );
  }
}
