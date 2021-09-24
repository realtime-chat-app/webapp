import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { addChatEntry } from '../actions/message.actions';
import { MessageState } from '../states/message.state';
import { CHAT_ACTIONS } from '../states/chat.state';

@Injectable({
  providedIn: 'root'
})
export class ChatEffectsService {

  private populateNewChatMessagesEntry$ = createEffect(
    () => this.actions$.pipe(
      ofType(CHAT_ACTIONS.AddChat),
      tap((payload: any) => this.msgStore.dispatch(addChatEntry({ chat: payload.chat }))),
    ), { dispatch: false }
  );

  constructor(
    private msgStore: Store<MessageState>,
    private actions$: Actions,
  ) {
    this.initializeEffects();
  }

  public initializeEffects() {
    this.populateNewChatMessagesEntry$.subscribe();
  }
}
