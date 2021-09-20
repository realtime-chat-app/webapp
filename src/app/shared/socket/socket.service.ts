import { Injectable } from '@angular/core';

import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { io, Socket } from 'socket.io-client';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ToastService } from '@shared/services';
import { AuthService } from '@core/services';

import { environment } from '@environment/environment';
import { User } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socketUrl = environment.socketUrl;
  private _socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

  public get socket() {
    return this._socket;
  }

  constructor(private authService: AuthService, private toastService: ToastService) {
    const user: User = this.authService.currentUserValue;
    try {
      this._socket = io(this.socketUrl, {
        path: '/ws',
        query: { user: JSON.stringify(user) },
      });
    } catch (error) {
      console.error(error);
    }

    this.disconnectedFeedback();
  }

  public fromEvent$(eventName: string): Observable<any> {
    return new Observable(observer => {
      this._socket?.on(eventName, payload => observer.next(payload));
    });
  }

  public fromManagerEvent$(eventName: string): Observable<any> {
    return new Observable(observer => {
      this._socket?.io.on(eventName as any, (payload: any) => observer.next(payload));
    });
  }

  public emit(eventName: string, payload: any): void {
    this.socket?.emit(eventName, payload);
  }

  private disconnectedFeedback(): void {
    this.fromEvent$('disconnect')
      .pipe(take(1))
      .subscribe(response => {
        this.toastService.displayToast(
          'Socket desconectado',
          'Recarregue a página para tentar novamente',
          'warning'
        );
      });
  }
}
