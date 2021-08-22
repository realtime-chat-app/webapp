import { Injectable } from '@angular/core';

import { io } from 'socket.io-client';

import { AuthService } from '@core/services';

import { ToastService } from '@shared/services';

import { environment } from '@environment/environment';
import { User } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socketUrl = environment.socketUrl;
  private socket;

  constructor(private authService: AuthService, private toastService: ToastService) {
    const user: User = this.authService.currentUserValue;
    if (user) this.socket = io(this.socketUrl, {
      path: '/',
      query: { user: JSON.stringify(user) },
    });

    this.socket?.on('disconnect', (msg) => {
      this.toastService.displayToast(
        'Socket desconectado',
        'Recarregue a página para tentar novamente',
        'warning'
      );
    });
  }
}
