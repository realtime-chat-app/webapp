import { Injectable } from '@angular/core';

import { io } from 'socket.io-client';

import { AuthService } from '@core/services';

import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socketUrl = environment.apiUrl;
  private socket;

  constructor(private authService: AuthService) {
    const user = this.authService.currentUserValue;
    if (user) this.socket = io(this.socketUrl, { path: '/ws', query: { user: JSON.stringify(user) } });
  }
}
